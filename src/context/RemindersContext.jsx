import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useNotifications } from './NotificationContext';
import { api } from '../services/api';

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

    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const data = await api.getReminders();
            // Data includes 'lead' object, we might want to flatten or use as is
            setReminders(data);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    };

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
                            const ipcRenderer = window.ipcRenderer;
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

                    // Mark as sent via API
                    try {
                        await api.updateReminder(reminder.id, { emailSent: true });
                        setReminders(prev => prev.map(r =>
                            r.id === reminder.id ? { ...r, emailSent: true } : r
                        ));
                    } catch (e) { console.error('Failed to update emailSent status', e); }

                    addToast(`Promemoria: ${reminder.title}`, 'info');
                }
            }
        };

        const interval = setInterval(checkReminders, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [reminders, addToast, addNotification]);

    const addReminder = async (reminder) => {
        try {
            // Optimistic update (with temp ID)
            const tempId = Date.now().toString();
            const tempReminder = { ...reminder, id: tempId, completed: false, emailSent: false, createdAt: new Date().toISOString() };
            setReminders(prev => [tempReminder, ...prev]);

            const created = await api.createReminder(reminder);

            // Replace with real data
            setReminders(prev => prev.map(r => r.id === tempId ? created : r));
            addToast('Promemoria aggiunto', 'success');
        } catch (error) {
            console.error('Error creating reminder:', error);
            addToast('Errore creazione promemoria', 'error');
            // Revert
            fetchReminders();
        }
    };

    const toggleReminder = async (id) => {
        const reminder = reminders.find(r => r.id === id);
        if (!reminder) return;

        const newState = !reminder.completed;

        // Optimistic
        setReminders(prev => prev.map(r =>
            r.id === id ? { ...r, completed: newState } : r
        ));

        try {
            await api.updateReminder(id, { completed: newState });
        } catch (error) {
            console.error('Error updating reminder:', error);
            fetchReminders(); // Revert
        }
    };

    const deleteReminder = async (id) => {
        // Optimistic
        setReminders(prev => prev.filter(r => r.id !== id));
        addToast('Promemoria eliminato', 'info');

        try {
            await api.deleteReminder(id);
        } catch (error) {
            console.error('Error deleting reminder:', error);
            fetchReminders(); // Revert
        }
    };

    return (
        <RemindersContext.Provider value={{ reminders, addReminder, toggleReminder, deleteReminder }}>
            {children}
        </RemindersContext.Provider>
    );
};
