import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Lead, Prisma } from '@prisma/client';

@Injectable()
export class LeadsService implements OnModuleInit {
    constructor(private prisma: PrismaService) { }

    private isSyncing = false;

    async onModuleInit() {
        console.log('[INIT] Auto-Syncing Leads from WordPress...');
        // this.syncLeads(); // Initial sync (Disabled to prevent startup timeout)

        // Sync every 60 seconds
        // setInterval(() => {
        //    if (!this.isSyncing) {
        //        this.syncLeads();
        //    }
        // }, 60000);
    }

    private log(message: string) {
        console.log(message);
        try {
            const fs = require('fs');
            const path = require('path');
            fs.appendFileSync(path.join(process.cwd(), 'sync_debug.log'), `[${new Date().toISOString()}] ${message}\n`);
        } catch (e) { }
    }

    async create(data: any): Promise<Lead> {
        // Separate specialized fields from dynamic 'data' (JSON)
        const { firstName, lastName, email, status, tenantId, tags, stageId, pipelineId, ...dynamicData } = data;

        // FIX: Ensure no double nesting of 'data' accidentally passed
        if (dynamicData.data && typeof dynamicData.data === 'object' && !Array.isArray(dynamicData.data)) {
            Object.assign(dynamicData, dynamicData.data);
            delete dynamicData.data;
        }

        return this.prisma.lead.create({
            data: {
                firstName,
                lastName,
                email,
                status: status || 'new', // Keep for backward compatibility
                stageId,
                pipelineId,
                tenantId,
                tags: tags || [],
                data: dynamicData, // Store rest as JSON
                createdAt: new Date(),
                timeline: {
                    create: { type: 'system', description: 'Lead creato' }
                }
            },
            include: { timeline: true }
        });
    }

    async findAll(tenantId?: string, status?: string): Promise<Lead[]> {
        console.log(`[SERVICE] Finding all leads. Tenant: ${tenantId}, Status: ${status}`);
        try {
            const whereClause: Prisma.LeadWhereInput = {
                ...(tenantId ? { tenantId } : {})
            };

            // If a specific status is requested (including 'trash'), use it.
            // Otherwise, exclude 'trash' by default.
            if (status) {
                whereClause.status = status;
            } else {
                whereClause.status = { not: 'trash' };
            }

            const leads = await this.prisma.lead.findMany({
                where: whereClause,
                include: {
                    timeline: { orderBy: { date: 'desc' } },
                    contracts: true,
                    practices: true,
                    reminders: true,
                    documents: true
                },
                orderBy: { createdAt: 'desc' }
            });
            console.log(`[SERVICE] Found ${leads.length} leads.`);
            return leads;
        } catch (error) {
            console.error('[SERVICE ERROR] findAll failed:', error);
            throw error;
        }
    }

    async findOne(id: string): Promise<Lead | null> {
        return this.prisma.lead.findUnique({
            where: { id },
            include: {
                timeline: { orderBy: { date: 'desc' } },
                contracts: true,
                practices: true,
                reminders: true,
                documents: true
            }
        });
    }

    async update(id: string, data: any): Promise<Lead> {
        // Handle specific updates vs dynamic data updates
        // Simple approach: merge top level fields
        // Handle specific updates vs dynamic data updates
        // Simple approach: merge top level fields
        const { firstName, lastName, email, status, tags, stageId, pipelineId, data: dynamicData, ...rest } = data;

        return this.prisma.lead.update({
            where: { id },
            data: {
                firstName,
                lastName,
                email,
                status,
                stageId,
                pipelineId,
                tags,
                data: dynamicData ? dynamicData : undefined
            },
            include: { timeline: true }
        });
    }

    async remove(id: string): Promise<Lead> {
        // 1. Get the lead to check if it's imported
        const lead = await this.prisma.lead.findUnique({ where: { id } });

        if (lead && lead.data && (lead.data as any).wp_id) {
            const wpId = (lead.data as any).wp_id;
            console.log(`[DELETE] Attempting to delete remote WP lead ${wpId}...`);

            try {
                // Reuse Credentials (should be env vars in production)
                const username = 'CRM';
                const password = 'oFLi 6VNh KvcG RRk9 UZmo QfhN';
                const hostname = 'www.automazza.it';
                const path = `/wp-json/wp/v2/auto_lead/${wpId}?force=true`; // force=true to bypass trash

                const https = require('https');
                const auth = Buffer.from(`${username}:${password}`).toString('base64');

                const deletePromise = () => new Promise<any>((resolve, reject) => {
                    const options = {
                        hostname: hostname,
                        path: path,
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Basic ${auth}`,
                            'User-Agent': 'NestJS/CRM'
                        }
                    };

                    const req = https.request(options, (res) => {
                        let data = '';
                        res.on('data', (chunk) => data += chunk);
                        res.on('end', () => {
                            if (res.statusCode >= 200 && res.statusCode < 300) {
                                resolve(JSON.parse(data));
                            } else {
                                // If 404/410 it's already gone, which is fine
                                if (res.statusCode === 404 || res.statusCode === 410) {
                                    resolve({ status: 'already_deleted' });
                                } else {
                                    reject(new Error(`WP Delete Status: ${res.statusCode}`));
                                }
                            }
                        });
                    });
                    req.on('error', (e) => reject(e));
                    req.end();
                });

                await deletePromise();
                console.log(`[DELETE] Remote WP lead ${wpId} deleted successfully.`);
                this.log(`[DELETE] SUCCESS remote WP lead ${wpId}`);
            } catch (error) {
                console.error(`[DELETE] Failed to delete remote WP lead ${wpId}:`, error);
                this.log(`[DELETE] FAILED remote WP lead ${wpId}: ${error.message}`);
                // We typically still want to delete locally even if remote fails
            }
        }

        // Soft Delete: Mark as trash to prevent re-sync from WordPress
        return this.prisma.lead.update({
            where: { id },
            data: { status: 'trash' }
        });
    }

    async syncLeads(): Promise<any> {
        if (this.isSyncing) return;
        this.isSyncing = true;

        const username = 'CRM';
        const password = 'oFLi 6VNh KvcG RRk9 UZmo QfhN';
        const hostname = 'www.automazza.it';
        const path = '/wp-json/wp/v2/auto_lead?per_page=20&status=publish'; // Fetch last 20 published leads
        const url = `https://${hostname}${path}`;

        this.log(`[SYNC] Starting sync from ${url}...`);
        let result: any;

        try {
            // Native FETCH fix: Switch to https module
            const https = require('https');
            const auth = Buffer.from(`${username}:${password}`).toString('base64');

            const fetchPromise = () => new Promise<any[]>((resolve, reject) => {
                const options = {
                    hostname: hostname,
                    path: path,
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${auth}`,
                        'User-Agent': 'NestJS/CRM',
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10s timeout
                };

                const req = https.request(options, (res) => {
                    let data = '';
                    res.on('data', (chunk) => data += chunk);
                    res.on('end', () => {
                        if (res.statusCode >= 200 && res.statusCode < 300) {
                            try {
                                resolve(JSON.parse(data));
                            } catch (e) {
                                reject(e);
                            }
                        } else {
                            reject(new Error(`Status: ${res.statusCode}`));
                        }
                    });
                });

                req.on('error', (e) => reject(e));
                req.on('timeout', () => {
                    req.destroy();
                    reject(new Error('Request timed out'));
                });
                req.end();
            });

            const leadsCheck = await fetchPromise();

            // Validate it is an array
            if (!Array.isArray(leadsCheck)) {
                console.error('[SYNC] Invalid response format (not an array)', leadsCheck);
                return { success: false, error: 'Invalid response format' };
            }
            const leads = (leadsCheck as any[]).reverse(); // Process oldest first to ensure latest update wins

            this.log(`[SYNC] Found ${leads.length} leads remotely.`);
            let imported = 0;

            for (const wpLead of leads) {
                try {
                    const wpId = wpLead.id;
                    const leadData = wpLead.lead_data || {};

                    // Fix: Validate WP ID immediately
                    if (!wpId) {
                        this.log(`[SYNC] Skipped lead with no WP ID. Keys: ${Object.keys(wpLead).join(', ')}`);
                        // this.log(`[SYNC] Raw dump: ${JSON.stringify(wpLead)}`); // Commented out to reduce noise
                        continue;
                    }

                    // Check if already exists by WP ID (stored in JSON data)
                    // Fix: Check strictly AND as string to avoid type mismatches reviving leads
                    const existing = await this.prisma.lead.findFirst({
                        where: {
                            OR: [
                                { data: { path: ['wp_id'], equals: wpId } },
                                { data: { path: ['wp_id'], equals: String(wpId) } },
                                { data: { path: ['wp_id'], equals: Number(wpId) } },
                                // Fix: Check nested data path found in debug
                                { data: { path: ['data', 'wp_id'], equals: wpId } },
                                { data: { path: ['data', 'wp_id'], equals: String(wpId) } },
                                { data: { path: ['data', 'wp_id'], equals: Number(wpId) } }
                            ]
                        }
                    });

                    if (existing) {
                        this.log(`[SYNC] Lead ${wpId} already exists (Status: ${existing.status}). Skipping.`);
                        continue;
                    }

                    // Check for existing lead by EMAIL (Smart Merge)
                    const leadEmail = leadData.email || '';
                    if (leadEmail) {
                        const existingByEmail = await this.prisma.lead.findFirst({
                            where: { email: leadEmail }
                        });

                        if (existingByEmail) {
                            this.log(`[SYNC] Found existing lead by email ${leadEmail} (ID: ${existingByEmail.id}). Merging and Reopening.`);

                            // Clean up dynamic data
                            // AGGRESSIVELY remove 'data' key if present to prevent nesting
                            const { data: rawJsonDump, nome, cognome, name, msg, message, ...cleanLeadData } = leadData;
                            if ('data' in cleanLeadData) delete (cleanLeadData as any).data;

                            const finalMessage = msg || message || '';

                            // Update existing lead
                            await this.prisma.lead.update({
                                where: { id: existingByEmail.id },
                                data: {
                                    status: 'new', // Reopen request
                                    timeline: {
                                        create: {
                                            type: 'system',
                                            description: `Nuova richiesta dal sito (WP ID: ${wpId}). Lead riaperto.`
                                        }
                                    },
                                    // Update dynamic data with new WP ID so next sync skips it
                                    data: {
                                        ...(existingByEmail.data as object), // Keep old data
                                        ...cleanLeadData,                    // Overwrite with new fields
                                        wp_id: wpId,                         // Update to latest WP ID
                                        message: finalMessage,               // Update message
                                        last_sync: new Date().toISOString()
                                    }
                                }
                            });
                            imported++;
                            continue; // Done, don't create new
                        }
                    }

                    // Map Data
                    const title = wpLead.title?.rendered || 'No Title';

                    // Name Parsing from Title (e.g. "Mario Rossi - 09/01/2026")
                    const titleParts = title.split('-')[0].trim().split(' ');
                    let lastName = titleParts.pop() || '';
                    let firstName = titleParts.join(' ') || '';
                    if (!firstName) { firstName = lastName; lastName = ''; } // Fallback

                    // Override if name available in custom fields
                    // Prioritize explicit Italian fields "nome"/"cognome"
                    if (leadData.nome || leadData.cognome) {
                        firstName = leadData.nome || firstName;
                        lastName = leadData.cognome || lastName;
                    } else if (leadData.name) {
                        const parts = leadData.name.trim().split(' ');
                        if (parts.length > 1) {
                            lastName = parts.pop();
                            firstName = parts.join(' ');
                        } else {
                            firstName = parts[0];
                            lastName = '';
                        }
                    }

                    // Clean up dynamic data to avoid raw JSON dumps
                    // Destructure to remove 'data' (raw dump), and standard fields we already mapped
                    const { data: rawJsonDump, nome, cognome, name, msg, message, ...cleanLeadData } = leadData;

                    // AGGRESSIVELY remove 'data' key if present to prevent nesting
                    if ((cleanLeadData as any).data) delete (cleanLeadData as any).data;

                    // Ensure message is consistent
                    const finalMessage = msg || message || '';

                    await this.create({
                        firstName: firstName,
                        lastName: lastName,
                        email: leadData.email || '',
                        phone: leadData.phone || '',
                        status: 'new',
                        tenantId: 'default',
                        source: 'website_import',
                        // Flattened: Put these directly in payload so they go to dynamicData
                        wp_id: wpId,
                        message: finalMessage,
                        ...cleanLeadData
                    });
                    this.log(`[SYNC] Imported lead ${wpId}`);
                    imported++;
                } catch (leadError) {
                    console.error(`[SYNC] Error processing lead ${wpLead?.id}:`, leadError);
                    this.log(`[SYNC] Error processing lead ${wpLead?.id}: ${leadError.message}`);
                    // Continue to next lead instead of crashing
                }
            }

            this.log(`[SYNC] Completed. Imported: ${imported}`);
            result = { success: true, imported, total: leads.length };

        } catch (error) {
            console.error('[SYNC] Failed:', error);
            this.log(`[SYNC] Failed: ${error.message}`);
            result = { success: false, error: error.message };
        } finally {
            this.isSyncing = false;
        }

        return result;
    }


    async importCsv(buffer: Buffer): Promise<any> {
        const { parse } = require('csv-parse/sync');

        try {
            const records = parse(buffer, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });

            console.log(`[CSV] Parsed ${records.length} records.`);

            let imported = 0;
            let errors = 0;

            for (const record of records) {
                try {
                    // Mapping Logic: Improve this based on actual CSV format
                    // Trying to be smart about column names (case insensitive matching?)

                    const normalizeKey = (obj: any, keyPattern: RegExp) => {
                        const key = Object.keys(obj).find(k => keyPattern.test(k));
                        return key ? obj[key] : null;
                    };

                    const email = normalizeKey(record, /email/i) || '';
                    const phone = normalizeKey(record, /phone|tel|cell/i) || '';
                    const firstName = normalizeKey(record, /first.*name|nome/i) || '';
                    const lastName = normalizeKey(record, /last.*name|cognome/i) || '';
                    const message = normalizeKey(record, /message|messaggio|note/i) || '';

                    // Fallback for Full Name
                    let finalFirstName = firstName;
                    let finalLastName = lastName;
                    if (!firstName && !lastName) {
                        const fullName = normalizeKey(record, /name|nome/i) || 'Unknown';
                        const parts = fullName.split(' ');
                        if (parts.length > 1) {
                            finalLastName = parts.pop();
                            finalFirstName = parts.join(' ');
                        } else {
                            finalFirstName = parts[0];
                        }
                    }

                    if (!email && !phone) {
                        console.warn('[CSV] Skipping record with no email/phone:', record);
                        continue;
                    }

                    // Check for duplicates
                    const matchConditions: Prisma.LeadWhereInput[] = [];
                    if (email) matchConditions.push({ email });
                    if (phone) {
                        matchConditions.push({
                            data: {
                                path: ['phone'],
                                equals: phone
                            }
                        });
                    }

                    let existing = null;
                    if (matchConditions.length > 0) {
                        existing = await this.prisma.lead.findFirst({
                            where: {
                                OR: matchConditions,
                                status: { not: 'trash' }
                            }
                        });
                    }

                    if (existing) {
                        console.log(`[CSV] Skipping duplicate lead (ID: ${existing.id}) - Email: ${email}, Phone: ${phone}`);
                        continue;
                    }

                    await this.create({
                        firstName: finalFirstName || 'Imported',
                        lastName: finalLastName || '',
                        email: email,
                        phone: phone,
                        message: message,
                        status: 'new',
                        tenantId: 'default',
                        source: 'csv_import',
                        // Store original record in data for reference
                        original_csv_data: record
                    });
                    imported++;

                } catch (e) {
                    console.error('[CSV] Error importing record:', e);
                    errors++;
                }
            }

            return {
                success: true,
                total: records.length,
                imported,
                errors
            };

        } catch (error) {
            console.error('[CSV] Parse Error:', error);
            throw new Error('Failed to parse CSV file: ' + error.message);
        }
    }

    async fixData(): Promise<any> {
        console.log('[MAINTENANCE] Starting data fix for nested structures...');
        const leads = await this.prisma.lead.findMany();
        let fixedCount = 0;

        for (const lead of leads) {
            const dynamicData = lead.data as any;
            if (dynamicData && dynamicData.data && typeof dynamicData.data === 'object' && !Array.isArray(dynamicData.data)) {

                // Recursively flatten if needed, but for now 1 level is enough based on findings
                Object.assign(dynamicData, dynamicData.data);
                delete dynamicData.data;

                // Also fix specific fields if they are in the root data but should be top level (not applicable here as we only care about data.data)

                await this.prisma.lead.update({
                    where: { id: lead.id },
                    data: { data: dynamicData }
                });
                fixedCount++;
            }
        }

        console.log(`[MAINTENANCE] Fixed ${fixedCount} leads.`);
        return { success: true, fixed: fixedCount };
    }
}
