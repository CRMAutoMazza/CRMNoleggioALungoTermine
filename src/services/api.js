import { supabase } from './supabaseClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getHeaders = async (includeContentType = true) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const headers = {
        'Authorization': token ? `Bearer ${token}` : ''
    };
    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }
    return headers;
};

export const api = {
    async getLeads() {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/leads`, { headers });
        if (!response.ok) throw new Error('Failed to fetch leads');
        return response.json();
    },

    async createLead(lead) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/leads`, {
            method: 'POST',
            headers,
            body: JSON.stringify(lead)
        });
        if (!response.ok) throw new Error('Failed to create lead');
        return response.json();
    },

    async updateLead(id, updates) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/leads/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error('Failed to update lead');
        return response.json();
    },

    async deleteLead(id) {
        const headers = await getHeaders(false); // No body, so no Content-Type needed strictly, but getting headers mostly for Auth
        const response = await fetch(`${API_URL}/leads/${id}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) throw new Error('Failed to delete lead');
        return response.json();
    },

    // SUB-RESOURCES
    async addTimelineEvent(leadId, event) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/leads/${leadId}/timeline`, {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        });
        if (!response.ok) throw new Error('Failed to add timeline event');
        return response.json();
    },

    async deleteTimelineEvent(leadId, eventId) {
        const headers = await getHeaders(false);
        const response = await fetch(`${API_URL}/leads/${leadId}/timeline/${eventId}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) throw new Error('Failed to delete timeline event');
        return response.json();
    },

    async addContract(leadId, contract) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/leads/${leadId}/contracts`, {
            method: 'POST',
            headers,
            body: JSON.stringify(contract)
        });
        if (!response.ok) throw new Error('Failed to add contract');
        return response.json();
    },

    async deleteContract(leadId, contractId) {
        const headers = await getHeaders(false);
        const response = await fetch(`${API_URL}/leads/${leadId}/contracts/${contractId}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) throw new Error('Failed to delete contract');
        return response.json();
    }
};
