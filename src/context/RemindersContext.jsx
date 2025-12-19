import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useNotifications } from './NotificationContext';

const RemindersContext = createContext();

export const useReminders = () => {
    const context = useContext(RemindersContext);
    if (!context) {
        throw new Error('useReminders must be used within a RemindersProvider');
    }
    return context;
};

export const RemindersProvider = ({ children }) => {
    const { addToast } = useToast();
    const { addNotification } = useNotifications();

    const [reminders, setReminders] = useState(() => {
        const saved = localStorage.getItem('crm_reminders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('crm_reminders', JSON.stringify(reminders));
    }, [reminders]);

    // Background Scheduler
    useEffect(() => {
        const checkReminders = async () => {
            // Read settings directly to avoid circular dependency with CRMContext
            const settingsStr = localStorage.getItem('crm_email_settings');
            const emailSettings = settingsStr ? JSON.parse(settingsStr) : {};

            const now = new Date();
            const dueReminders = reminders.filter(r =>
                !r.completed &&
                !r.emailSent &&
                r.notifyEmail &&
                new Date(r.datetime) <= now
            );

            if (dueReminders.length > 0) {
                for (const reminder of dueReminders) {
                    // Send Email
                    if (emailSettings.host && emailSettings.user) {
                        try {
                            const { ipcRenderer } = window.require('electron');
                            await ipcRenderer.invoke('send-email', {
                                settings: emailSettings,
                                email: {
                                    to: emailSettings.user, // Send to self
                                    subject: `Promemoria: ${reminder.title}`,
                                    message: `Hai un promemoria in scadenza:\n\n${reminder.title}\nData: ${new Date(reminder.datetime).toLocaleString()}\n\nAccedi al CRM per i dettagli.`
                                }
                            });
                            addNotification(`Email inviata per promemoria: ${reminder.title}`, 'info');
                        } catch (error) {
                            console.error('Failed to send reminder email', error);
                            addToast('Errore invio email promemoria', 'error');
                        }
                    } else {
                        console.warn('Email settings missing, skipping email for reminder:', reminder.title);
                        addToast('Email non inviata: Configura SMTP nelle Impostazioni', 'warning');
                    }

                    // Mark as sent to avoid spamming
                    setReminders(prev => prev.map(r =>
                        r.id === reminder.id ? { ...r, emailSent: true } : r
                    ));

                    addToast(`Promemoria: ${reminder.title}`, 'info');
                }
            }
        };

        const interval = setInterval(checkReminders, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [reminders, addToast, addNotification]);

    const addReminder = (reminder) => {
        const newReminder = {
            id: Date.now(),
            completed: false,
            emailSent: false,
            createdAt: new Date().toISOString(),
            ...reminder
        };
        setReminders(prev => [newReminder, ...prev]);
        addToast('Promemoria aggiunto', 'success');
    };

    const toggleReminder = (id) => {
        setReminders(prev => prev.map(r =>
            r.id === id ? { ...r, completed: !r.completed } : r
        ));
    };

    const deleteReminder = (id) => {
        setReminders(prev => prev.filter(r => r.id !== id));
        addToast('Promemoria eliminato', 'info');
    };

    return (
        <RemindersContext.Provider value={{ reminders, addReminder, toggleReminder, deleteReminder }}>
            {children}
        </RemindersContext.Provider>
    );
};
