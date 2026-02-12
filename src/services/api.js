import { supabase } from './supabaseClient';

// HARDCODED PRODUCTION URL - To bypass Vercel Env Var issues
const API_URL = 'https://crmnoleggioalungotermine-production.up.railway.app';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getHeaders = async (includeContentType = true) => {
    let token = '';
    try {
        // Race auth check against a 2000ms timeout to prevent blocking UI too long, but ensure we get token
        const { data } = await Promise.race([
            supabase.auth.getSession(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Auth Timeout')), 2000))
        ]);
        token = data?.session?.access_token;
    } catch (e) {
        console.warn('Auth check skipped/failed:', e);
    }

    const headers = {
        'Authorization': token ? `Bearer ${token}` : ''
    };
    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }
    return headers;
};

export const api = {
    async getLeads(status) {
        const headers = await getHeaders();
        let url = `${API_URL}/leads`;
        if (status) {
            url += `?status=${status}`;
        }
        const response = await fetch(url, { headers });
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
        if (!response.ok) {
            const text = await response.text();
            console.error('API Error:', response.status, text);
            throw new Error(`Failed to delete lead: ${response.status} ${text}`);
        }
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
    },

    async sendMail(payload) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/mail/send`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Failed to send email');
        }
        return response.json();
    },

    async verifySmtp(settings) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/mail/verify`, {
            method: 'POST',
            headers,
            body: JSON.stringify(settings)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Verification failed');
        }
        return response.json();
    },

    async uploadFile(file) {
        const headers = await getHeaders(false); // No Content-Type (FormData handles it)
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_URL}/files/upload`, {
            method: 'POST',
            headers,
            body: formData
        });

        if (!response.ok) {
            throw new Error('File upload failed');
        }
        return response.json();
    },

    // PIPELINES & STAGES
    async getPipelines(tenantId) {
        const headers = await getHeaders();
        const query = tenantId ? `?tenantId=${tenantId}` : '';
        const response = await fetch(`${API_URL}/pipelines${query}`, { headers });
        if (!response.ok) throw new Error('Failed to fetch pipelines');
        return response.json();
    },

    async createPipeline(data) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/pipelines`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create pipeline');
        return response.json();
    },

    async updatePipeline(id, data) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/pipelines/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update pipeline');
        return response.json();
    },

    async deletePipeline(id) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/pipelines/${id}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) throw new Error('Failed to delete pipeline');
        return response.json();
    },

    async createStage(data) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/pipelines/stages`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create stage');
        return response.json();
    },

    async updateStage(id, data) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/pipelines/stages/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update stage');
        return response.json();
    },

    async deleteStage(id) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/pipelines/stages/${id}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) throw new Error('Failed to delete stage');
        return response.json();
    },

    // CUSTOM FIELDS
    async getCustomFields(tenantId, entityType = 'lead') {
        const headers = await getHeaders();
        let query = `?entityType=${entityType}`;
        if (tenantId) query += `&tenantId=${tenantId}`;

        const response = await fetch(`${API_URL}/custom-fields${query}`, { headers });
        if (!response.ok) throw new Error('Failed to fetch custom fields');
        return response.json();
    },

    async createCustomField(data) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/custom-fields`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create custom field');
        return response.json();
    },

    async updateCustomField(id, data) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/custom-fields/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update custom field');
        return response.json();
    },

    async deleteCustomField(id) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/custom-fields/${id}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) throw new Error('Failed to delete custom field');
        return response.json();
    },

    // REMINDERS
    async getReminders() {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/reminders`, { headers });
        if (!response.ok) throw new Error('Failed to fetch reminders');
        return response.json();
    },

    async createReminder(data) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/reminders`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create reminder');
        return response.json();
    },

    async updateReminder(id, data) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/reminders/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update reminder');
        return response.json();
    },

    async deleteReminder(id) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/reminders/${id}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) throw new Error('Failed to delete reminder');
        return response.json();
    },

    async fixLeadsData() {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/leads/fix-data`, {
            method: 'POST',
            headers
        });
        if (!response.ok) throw new Error('Failed to fix data');
        return response.json();
    },

    // EMAIL (Replaces Electron IPC)
    async fetchEmails(settings) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/mail/fetch`, {
            method: 'POST',
            headers,
            body: JSON.stringify(settings)
        });
        if (!response.ok) throw new Error('Failed to fetch emails');
        return response.json();
    },

    async fetchEmailBody(settings, uid) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/mail/fetch-body`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ settings, uid })
        });
        if (!response.ok) throw new Error('Failed to fetch email body');
        return response.json();
    },

    async deleteEmail(settings, uid) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/mail/delete`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ settings, uid })
        });
        if (!response.ok) throw new Error('Failed to delete email');
        return response.json();
    },

    // DOCUMENTS (Replaces Electron IPC)
    async listDocuments(path) {
        const headers = await getHeaders();
        // Path is passed as query param, relative to user data root
        const query = path ? `?path=${encodeURIComponent(path)}` : '';
        const response = await fetch(`${API_URL}/documents/list${query}`, { headers });
        if (!response.ok) throw new Error('Failed to list documents');
        return response.json();
    },

    async createFolder(path) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/documents/folder`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ path })
        });
        if (!response.ok) throw new Error('Failed to create folder');
        return response.json(); // Expect { success: true }
    },

    async saveDocument(data) {
        // data: { folderPath, fileName, data (base64) }
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/documents/upload`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to save document');
        return response.json();
    },

    async deleteDocument(path) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/documents/delete`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ path })
        });
        if (!response.ok) throw new Error('Failed to delete document');
        return response.json();
    },

    // OFFERS
    async getOffers() {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/offers`, { headers });
        if (!response.ok) return { headers: [], data: [] };
        return response.json();
    },

    async saveOffers(data) {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/offers`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to save offers');
        return response.json();
    }
};
