import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useNotifications } from './NotificationContext';

const AgendaContext = createContext();

export const useAgenda = () => {
    const context = useContext(AgendaContext);
    if (!context) {
        throw new Error('useAgenda must be used within an AgendaProvider');
    }
    return context;
};

export const AgendaProvider = ({ children }) => {
    const { addToast } = useToast();
    const { addNotification } = useNotifications();

    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem('crm_agenda');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('crm_agenda', JSON.stringify(events));
    }, [events]);

    // Check for Event Notifications
    useEffect(() => {
        const checkEvents = async () => {
            const settingsStr = localStorage.getItem('crm_email_settings');
            const emailSettings = settingsStr ? JSON.parse(settingsStr) : {};
            const now = new Date();

            // Find events that are due (start time <= now), not passed by too much (e.g. 1 hour), and not notified yet
            // We'll notify 15 mins before? Or AT the time? 
            // Request said "funzione notifica (che manderà sempre per email)".
            // Let's assume we notify 15 mins before start time, OR if start time is now.
            // Simplified: Notify if current time >= start time - 15min AND not notified.

            const pendingEvents = events.filter(e => {
                const start = new Date(e.start);
                const timeDiff = start - now;
                const minutesDiff = timeDiff / 1000 / 60;

                // Notify if within 15 mins before or ongoing, and not notified
                return !e.notified && minutesDiff <= 15 && timeDiff > -3600000; // Don't notify for old events (>1h ago)
            });

            if (pendingEvents.length > 0) {
                for (const event of pendingEvents) {
                    if (emailSettings.host && emailSettings.user) {
                        try {
                            const ipcRenderer = window.ipcRenderer;
                            await ipcRenderer.invoke('send-email', {
                                settings: emailSettings,
                                email: {
                                    to: emailSettings.user,
                                    subject: `Agenda: ${event.title}`,
                                    message: `Hai un evento in programma:\n\n${event.title}\nInizio: ${new Date(event.start).toLocaleString()}\nFine: ${new Date(event.end).toLocaleString()}\n\n${event.description || ''}`
                                }
                            });
                            addNotification(`Email inviata per evento: ${event.title}`, 'info');
                        } catch (error) {
                            console.error('Failed to send agenda email', error);
                        }
                    }

                    // Mark as notified
                    setEvents(prev => prev.map(e =>
                        e.id === event.id ? { ...e, notified: true } : e
                    ));
                }
            }
        };

        const interval = setInterval(checkEvents, 60000); // Check every minute
        checkEvents(); // Initial check

        return () => clearInterval(interval);
    }, [events, addNotification]);

    const addEvent = (event) => {
        const newEvent = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            notified: false,
            ...event
        };
        setEvents(prev => [...prev, newEvent]);
        addToast('Evento aggiunto in agenda', 'success');
    };

    const updateEvent = (id, updates) => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
        addToast('Evento aggiornato', 'success');
    };

    const deleteEvent = (id) => {
        setEvents(prev => prev.filter(e => e.id !== id));
        addToast('Evento rimosso', 'info');
    };

    return (
        <AgendaContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </AgendaContext.Provider>
    );
};
