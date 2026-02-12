"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LeadsService = class LeadsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.isSyncing = false;
    }
    async onModuleInit() {
        console.log('[INIT] Auto-Syncing Leads from WordPress...');
        this.syncLeads();
        setInterval(() => {
            if (!this.isSyncing) {
                this.syncLeads();
            }
        }, 60000);
    }
    async create(data) {
        const { firstName, lastName, email, status, tenantId, tags, stageId, pipelineId } = data, dynamicData = __rest(data, ["firstName", "lastName", "email", "status", "tenantId", "tags", "stageId", "pipelineId"]);
        return this.prisma.lead.create({
            data: {
                firstName,
                lastName,
                email,
                status: status || 'new',
                stageId,
                pipelineId,
                tenantId,
                tags: tags || [],
                data: dynamicData,
                createdAt: new Date(),
                timeline: {
                    create: { type: 'system', description: 'Lead creato' }
                }
            },
            include: { timeline: true }
        });
    }
    async findAll(tenantId) {
        console.log('[SERVICE] Finding all leads...');
        try {
            const leads = await this.prisma.lead.findMany({
                where: Object.assign(Object.assign({}, (tenantId ? { tenantId } : {})), { status: { not: 'trash' } }),
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
        }
        catch (error) {
            console.error('[SERVICE ERROR] findAll failed:', error);
            throw error;
        }
    }
    async findOne(id) {
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
    async update(id, data) {
        const { firstName, lastName, email, status, tags, stageId, pipelineId, data: dynamicData } = data, rest = __rest(data, ["firstName", "lastName", "email", "status", "tags", "stageId", "pipelineId", "data"]);
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
    async remove(id) {
        return this.prisma.lead.update({
            where: { id },
            data: { status: 'trash' }
        });
    }
    async syncLeads() {
        var _a;
        if (this.isSyncing)
            return;
        this.isSyncing = true;
        const username = 'CRM';
        const password = 'oFLi 6VNh KvcG RRk9 UZmo QfhN';
        const hostname = 'www.automazza.it';
        const path = '/wp-json/wp/v2/auto_lead?per_page=20&status=publish';
        const url = `https://${hostname}${path}`;
        console.log(`[SYNC] Starting sync from ${url}...`);
        let result;
        try {
            const https = require('https');
            const auth = Buffer.from(`${username}:${password}`).toString('base64');
            const fetchPromise = () => new Promise((resolve, reject) => {
                const options = {
                    hostname: hostname,
                    path: path,
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${auth}`,
                        'User-Agent': 'NestJS/CRM',
                        'Content-Type': 'application/json'
                    }
                };
                const req = https.request(options, (res) => {
                    let data = '';
                    res.on('data', (chunk) => data += chunk);
                    res.on('end', () => {
                        if (res.statusCode >= 200 && res.statusCode < 300) {
                            try {
                                resolve(JSON.parse(data));
                            }
                            catch (e) {
                                reject(e);
                            }
                        }
                        else {
                            reject(new Error(`Status: ${res.statusCode}`));
                        }
                    });
                });
                req.on('error', (e) => reject(e));
                req.end();
            });
            const leadsCheck = await fetchPromise();
            if (!Array.isArray(leadsCheck)) {
                console.error('[SYNC] Invalid response format (not an array)', leadsCheck);
                return { success: false, error: 'Invalid response format' };
            }
            const leads = leadsCheck;
            console.log(`[SYNC] Found ${leads.length} leads remotely.`);
            let imported = 0;
            for (const wpLead of leads) {
                const wpId = wpLead.id;
                const existing = await this.prisma.lead.findFirst({
                    where: {
                        data: {
                            path: ['wp_id'],
                            equals: wpId
                        }
                    }
                });
                if (existing) {
                    console.log(`[SYNC] Lead ${wpId} already exists. Skipping.`);
                    continue;
                }
                const leadData = wpLead.lead_data || {};
                const title = ((_a = wpLead.title) === null || _a === void 0 ? void 0 : _a.rendered) || 'No Title';
                const titleParts = title.split('-')[0].trim().split(' ');
                let lastName = titleParts.pop() || '';
                let firstName = titleParts.join(' ') || '';
                if (!firstName) {
                    firstName = lastName;
                    lastName = '';
                }
                if (leadData.nome || leadData.cognome) {
                    firstName = leadData.nome || firstName;
                    lastName = leadData.cognome || lastName;
                }
                else if (leadData.name) {
                    const parts = leadData.name.trim().split(' ');
                    if (parts.length > 1) {
                        lastName = parts.pop();
                        firstName = parts.join(' ');
                    }
                    else {
                        firstName = parts[0];
                        lastName = '';
                    }
                }
                const { data: rawJsonDump, nome, cognome, name, msg, message } = leadData, cleanLeadData = __rest(leadData, ["data", "nome", "cognome", "name", "msg", "message"]);
                const finalMessage = msg || message || '';
                await this.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: leadData.email || '',
                    phone: leadData.phone || '',
                    status: 'new',
                    tenantId: 'default',
                    source: 'website_import',
                    data: Object.assign({ wp_id: wpId, message: finalMessage }, cleanLeadData)
                });
                imported++;
            }
            console.log(`[SYNC] Completed. Imported: ${imported}`);
            result = { success: true, imported, total: leads.length };
        }
        catch (error) {
            console.error('[SYNC] Failed:', error);
            result = { success: false, error: error.message };
        }
        finally {
            this.isSyncing = false;
        }
        return result;
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map