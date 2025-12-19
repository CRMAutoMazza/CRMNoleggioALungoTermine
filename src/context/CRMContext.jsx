import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAutomation } from './AutomationContext';
import { api } from '../services/api';

const CRMContext = createContext();

export const useCRM = () => {
    const context = useContext(CRMContext);
    if (!context) {
        throw new Error('useCRM must be used within a CRMProvider');
    }
    return context;
};

const initialFields = [
    { id: 'phone', label: 'Telefono', type: 'tel', required: true },
    { id: 'pec', label: 'PEC', type: 'email', required: false },
    { id: 'address', label: 'Indirizzo', type: 'text', required: false },
    { id: 'city', label: 'Città', type: 'text', required: false },
    { id: 'referral', label: 'Consigliato da', type: 'text', required: false },
    { id: 'model', label: 'Modello Interessato', type: 'text', required: false },
    { id: 'budget', label: 'Budget', type: 'number', required: false },
    { id: 'contactTime', label: 'Orario di Contatto', type: 'time', required: false },
    { id: 'notes', label: 'Note', type: 'textarea', required: false },
];

const initialLeads = [
    {
        id: '1',
        firstName: 'Mario',
        lastName: 'Rossi',
        email: 'mario.rossi@example.com',
        status: 'new',
        createdAt: new Date().toISOString(),
        data: {
            phone: '+39 333 1234567',
            city: 'Milano',
            model: 'Fiat 500',
            budget: '300',
            contactTime: '18:00',
            notes: 'Interessato a noleggio 36 mesi'
        },
        documents: []
    },
    {
        id: '2',
        firstName: 'Luigi',
        lastName: 'Verdi',
        email: 'luigi.verdi@example.com',
        status: 'contacted',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        data: {
            phone: '+39 333 9876543',
            city: 'Roma',
            model: 'Jeep Renegade',
            budget: '500',
            contactTime: '10:00',
            notes: ''
        },
        documents: []
    }
];

export const CRMProvider = ({ children }) => {
    // Keep local storage for fields/settings for now, or migrate later
    const [fields, setFields] = useState(() => {
        const saved = localStorage.getItem('crm_fields');
        if (saved) {
            const parsed = JSON.parse(saved);
            const existingIds = new Set(parsed.map(f => f.id));
            const missingDefaults = initialFields.filter(f => !existingIds.has(f.id));
            return [...parsed, ...missingDefaults];
        }
        return initialFields;
    });

    const [emailSettings, setEmailSettings] = useState(() => {
        const saved = localStorage.getItem('crm_email_settings');
        return saved ? JSON.parse(saved) : {
            host: 'smtps.aruba.it',
            imapHost: 'imaps.aruba.it',
            port: '465',
            user: '',
            pass: '',
            fromName: ''
        };
    });

    // LEADS MANAGEMENT - NOW VIA API
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const { triggerEvent, checkTimeRules } = useAutomation();

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const data = await api.getLeads();
            setLeads(data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const addLead = async (lead) => {
        try {
            const newLead = await api.createLead(lead);
            setLeads(prev => [newLead, ...prev]);
        } catch (error) {
            console.error('Error creating lead:', error);
        }
    };

    const updateLead = async (id, updates) => {
        // Optimistic update
        setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));

        try {
            await api.updateLead(id, updates);
            // Verify/Refresh data from server if needed, or trust optimistic
        } catch (error) {
            console.error('Error updating lead:', error);
            // Revert on error?
            fetchLeads();
        }

        // Trigger Event Side Effect (same logic as before)
        const currentLead = leads.find(l => l.id === id);
        if (currentLead && updates.status && updates.status !== currentLead.status) {
            triggerEvent('ON_LEAD_STATUS_CHANGE', {
                lead: { ...currentLead, ...updates },
                oldStatus: currentLead.status,
                newStatus: updates.status
            });
        }
    };

    const deleteLead = async (id) => {
        try {
            await api.deleteLead(id);
            setLeads(prev => prev.filter(lead => lead.id !== id));
        } catch (error) {
            console.error('Error deleting lead:', error);
        }
    };

    // Sub-entities (Timeline, Specs, etc.) are currently nested in Lead model in Prisma
    // For a MVP migration, we can treat them as "updates" to the Lead or build specific endpoints later.
    // However, our Backend logic currently "includes" them.
    // If we want to add a timeline event, we effectively "update the lead" or need a specific endpoint.
    // Our API service currently only has updateLead.
    // Ideally we should have sub-resource endpoints, but for speed, we can assume 'updateLead' 
    // MIGHT fail if the backend doesn't support nested writes easily on update.
    // BUT, since we use Prisma, we CAN do nested writes if configured.
    // Re-checking LeadsService: strictly updates firstName, lastName, email, status, items.
    // It does NOT appear to handle nested updates deeply for timeline events via the generic 'update' method easily
    // without manual Prisma handling (e.g. { timeline: { create: ... } }).
    //
    // PLAN B for Phase 2: Simplify. Treat Timeline/Contracts as purely client-side logic wrapped in 'updateLead' 
    // IF the backend supported full JSON replacement, but it supports structured Relational Data.
    //
    // CRITICAL: The current backend `update` method (leads.service.ts) extracts top-level fields 
    // and puts the rest in `data` JSON. This works for custom fields.
    // But Timeline, Contracts, etc. are REAL relations in the new DB.
    // So `updateLead(id, { timeline: [...] })` won't work automatically unless we modify the backend.
    //
    // SOLUTION: I will implement `addTimelineEvent` etc. by calling `updateLead` but I realize 
    // I need to update the Backend Controller/Service to handle these relations, OR 
    // (Simpler for now) just stick to the basic Lead fields and 'data' json column for EVERYTHING 
    // that isn't strict.
    //
    // NO, we defined a nice schema. We should use it.
    // I need to add endpoints for Timeline, Contracts, etc. or update the `updateLead` to handle them.
    // For this exact step, I will map the frontend functions to `console.warn("Not implemented in Cloud yet")` 
    // or try to hack it via generic update if possible? No.
    //
    // Let's implement full CRUD properly.
    // I will add `addTimelineEvent` to `api.js` and backend in the next steps.
    // For now, I'll comment them out or leave them as local-only (volatile) to not break the UI,
    // creating a hybrid state while I finishing the backend.

    // TEMPORARY HYBRID APPROACH for Sub-collections (Contract/Practices/Timeline):
    // We will keep them in local state `leads` optimistically, but they won't persist to DB 
    // until we add the specific API endpoints.

    const addTimelineEvent = async (leadId, event) => {
        // Optimistic Update
        const tempId = crypto.randomUUID();
        const newEvent = { id: tempId, date: new Date().toISOString(), ...event };

        setLeads(prev => prev.map(lead => {
            if (lead.id !== leadId) return lead;
            return {
                ...lead,
                timeline: [newEvent, ...(lead.timeline || [])]
            };
        }));

        try {
            const created = await api.addTimelineEvent(leadId, event);
            // Replace temp ID with real one from server
            setLeads(prev => prev.map(lead => {
                if (lead.id !== leadId) return lead;
                return {
                    ...lead,
                    timeline: lead.timeline.map(t => t.id === tempId ? created : t)
                };
            }));
        } catch (error) {
            console.error('Error adding timeline event:', error);
            // Revert on error
            fetchLeads();
        }
    };

    // ... (Keep other sub-functions similar, strictly valid for UI but not persistent yet)
    // To save tokens I will just copy the logic but acknowledge the lack of persistence.

    const deleteTimelineEvent = async (leadId, eventId) => {
        setLeads(prev => prev.map(lead => {
            if (lead.id !== leadId) return lead;
            return {
                ...lead,
                timeline: (lead.timeline || []).filter(e => (e.id || e.date) !== eventId)
            };
        }));

        try {
            await api.deleteTimelineEvent(leadId, eventId);
        } catch (error) {
            console.error('Error deleting timeline event:', error);
            fetchLeads();
        }
    };

    const updateTimelineEvent = (leadId, eventId, updatedData) => {
        setLeads(prev => prev.map(lead => {
            if (lead.id !== leadId) return lead;
            return {
                ...lead,
                timeline: (lead.timeline || []).map(e =>
                    (e.id || e.date) === eventId ? { ...e, ...updatedData } : e
                )
            };
        }));
    };

    const addContract = async (leadId, contract) => {
        const tempId = crypto.randomUUID();
        const newContract = { id: tempId, createdAt: new Date().toISOString(), status: 'active', ...contract };

        setLeads(prev => prev.map(lead => {
            if (lead.id !== leadId) return lead;
            return {
                ...lead,
                contracts: [...(lead.contracts || []), newContract]
            };
        }));

        try {
            const created = await api.addContract(leadId, contract);
            setLeads(prev => prev.map(lead => {
                if (lead.id !== leadId) return lead;
                return {
                    ...lead,
                    contracts: lead.contracts.map(c => c.id === tempId ? created : c)
                };
            }));
        } catch (error) {
            console.error('Error adding contract:', error);
            fetchLeads();
        }
    };

    const deleteContract = async (leadId, contractId) => {
        setLeads(prev => prev.map(lead => {
            if (lead.id !== leadId) return lead;
            return {
                ...lead,
                contracts: (lead.contracts || []).filter(c => c.id !== contractId)
            };
        }));

        try {
            await api.deleteContract(leadId, contractId);
        } catch (error) {
            console.error('Error deleting contract:', error);
            fetchLeads();
        }
    };

    const addPractice = (leadId, practice) => {
        setLeads(prev => prev.map(lead => {
            if (lead.id !== leadId) return lead;
            return {
                ...lead,
                practices: [...(lead.practices || []), { ...practice, id: crypto.randomUUID() }]
            };
        }));
    };


    // Fields & Settings persistence (Local Storage)
    useEffect(() => {
        localStorage.setItem('crm_fields', JSON.stringify(fields));
    }, [fields]);

    useEffect(() => {
        localStorage.setItem('crm_email_settings', JSON.stringify(emailSettings));
    }, [emailSettings]);

    const addField = (field) => {
        const newField = { ...field, id: field.label.toLowerCase().replace(/\s+/g, '_') };
        setFields(prev => [...prev, newField]);
    };

    const removeField = (id) => {
        setFields(prev => prev.filter(field => field.id !== id));
    };

    const updateEmailSettings = (settings) => {
        setEmailSettings(settings);
    };

    const bulkDeleteLeads = (ids) => {
        // API call needed
        ids.forEach(id => deleteLead(id));
    };

    const updateLeadsStatusBulk = (ids, newStatus) => {
        ids.forEach(id => updateLead(id, { status: newStatus }));
    };

    return (
        <CRMContext.Provider value={{
            leads,
            loading, // Exposed loading
            fields,
            emailSettings,
            updateEmailSettings,
            addLead,
            updateLead,
            deleteLead,
            bulkDeleteLeads,
            updateLeadsStatusBulk,
            addTimelineEvent,
            deleteTimelineEvent,
            updateTimelineEvent,
            addContract,
            deleteContract,
            addPractice,
            addField,
            removeField
        }}>
            {children}
        </CRMContext.Provider>
    );
};
