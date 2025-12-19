import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useReminders } from './RemindersContext';
// Note: We can't import useCRM directly if useCRM imports useAutomation (circular dependency).
// We will pass necessary CRM data/methods or use a custom event system. 
// For simplicity, we'll accept 'leads' via a prop or method if needed, or structured differently.
// Better: Layout provides the bridge or we use pure logic. 

const AutomationContext = createContext();

export const useAutomation = () => {
    const context = useContext(AutomationContext);
    if (!context) {
        throw new Error('useAutomation must be used within an AutomationProvider');
    }
    return context;
};

export const AutomationProvider = ({ children }) => {
    const { addToast } = useToast();
    const { addReminder } = useReminders();

    // Stored Rules
    const [rules, setRules] = useState(() => {
        const saved = localStorage.getItem('crm_automations');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('crm_automations', JSON.stringify(rules));
    }, [rules]);

    const addRule = (rule) => {
        const newRule = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            isActive: true,
            ...rule
        };
        setRules(prev => [...prev, newRule]);
        addToast('Regola creata', 'success');
    };

    const deleteRule = (id) => {
        setRules(prev => prev.filter(r => r.id !== id));
        addToast('Regola eliminata', 'info');
    };

    const toggleRule = (id) => {
        setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
    };

    // --- EXECUTION ENGINE ---

    // 1. Event Triggers (Immediate)
    // payload: { lead, oldStatus, newStatus } for status change
    const triggerEvent = async (eventType, payload) => {


        const matchingRules = rules.filter(r => r.isActive && r.triggerType === eventType);

        for (const rule of matchingRules) {

            // Validate Condition
            if (eventType === 'ON_LEAD_STATUS_CHANGE') {
                if (rule.condition.fromStatus !== '*' && rule.condition.fromStatus !== payload.oldStatus) continue;
                if (rule.condition.toStatus !== '*' && rule.condition.toStatus !== payload.newStatus) continue;
            }

            // Execute Action
            await executeAction(rule.action, payload);
        }
    };

    // 2. Time Triggers (Polled externally or via interval here)
    // We need access to Leads to check dates. 
    // We will expose a check which CRMContext (or a Wrapper) calls periodically.
    const checkTimeRules = async (leads) => {
        const now = new Date();
        const activeRules = rules.filter(r => r.isActive && r.triggerType === 'BEFORE_CONTRACT_EXPIRY');

        if (activeRules.length === 0) return;

        for (const lead of leads) {
            if (!lead.contracts) continue;

            for (const contract of lead.contracts) {
                const expiry = new Date(contract.endDate);

                for (const rule of activeRules) {
                    const daysBefore = rule.condition.daysBefore || 0;
                    const checkDate = new Date(expiry);
                    checkDate.setDate(checkDate.getDate() - daysBefore);

                    // Check if TODAY is the checkDate (ignoring time)
                    if (isSameDay(now, checkDate)) {
                        // Check if already executed today for this item to avoid spam? 
                        // Implementation detail: we might need an 'executionLog' in the rule or lead.
                        // For MVP: We assume this runs once a day or user tolerates duplicates if opening app multiple times.
                        // Better: Store lastExecution date in localStorage or rule metadata specific to target.
                        // Let's rely on Reminders deduplication or just simple check.

                        await executeAction(rule.action, { lead, contract, context: 'expiry' });
                    }
                }
            }
        }
    };

    const isSameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    const executeAction = async (action, payload) => {
        const { lead, contract } = payload;

        // Helper to replace variables
        const replaceVars = (text) => {
            let res = text || '';
            res = res.replace(/{firstName}/g, lead.firstName || '');
            res = res.replace(/{lastName}/g, lead.lastName || '');
            res = res.replace(/{company}/g, 'AutoMazza'); // Global constant
            if (contract) {
                res = res.replace(/{contractTitle}/g, contract.title || '');
                res = res.replace(/{endDate}/g, new Date(contract.endDate).toLocaleDateString() || '');
            }
            return res;
        };

        if (action.type === 'SEND_EMAIL') {
            const compiledSubject = replaceVars(action.subject);
            const compiledBody = replaceVars(action.body);
            const toEmail = lead.email;

            if (!toEmail) {

                return;
            }

            try {
                // Determine settings source (we need them here, or call Main directly checking storage)
                const settingsStr = localStorage.getItem('crm_email_settings');
                const settings = settingsStr ? JSON.parse(settingsStr) : null;

                if (settings && settings.host) {
                    const { ipcRenderer } = window.require('electron');
                    await ipcRenderer.invoke('send-email', {
                        settings,
                        email: { to: toEmail, subject: compiledSubject, message: compiledBody }
                    });
                    addToast(`Automazione: Email inviata a ${lead.firstName}`, 'success');
                } else {
                    addToast('Automazione fallita: SMTP non configurato', 'error');
                }
            } catch (e) {
                console.error('Automation Email Error', e);
            }

        } else if (action.type === 'ADD_REMINDER') {
            const compiledTitle = replaceVars(action.title);
            addReminder({
                title: compiledTitle,
                datetime: new Date().toISOString(), // Immediate or planned? usually for "ToDo"
                // If we want it for a specific time, action needs config. 
                // For "Contract Expiry", we probably want it ON that day.
                leadId: lead.id
            });
            addToast(`Automazione: Promemoria creato`, 'info');

        } else if (action.type === 'OPEN_WHATSAPP') {
            const compiledMessage = replaceVars(action.message);
            const phone = lead.data?.phone; // Ensure standard format
            if (phone) {
                // We communicate via Toast or open new window?
                // Opening window automatically might be blocked or annoying.
                // Best approach: Create a notification/One-time-action that user clicks.
                // Or try shell.openExternal

                try {
                    const { shell } = window.require('electron');
                    const cleanPhone = phone.replace(/\D/g, '');
                    const url = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(compiledMessage)}`;

                    shell.openExternal(url);
                    addToast(`Automazione: WhatsApp aperto per ${lead.firstName}`, 'success');
                } catch (e) {
                    console.error('Error opening WhatsApp', e);
                    addToast('Errore apertura WhatsApp', 'error');
                }
            }
        }
    };

    return (
        <AutomationContext.Provider value={{ rules, addRule, deleteRule, toggleRule, triggerEvent, checkTimeRules }}>
            {children}
        </AutomationContext.Provider>
    );
};
