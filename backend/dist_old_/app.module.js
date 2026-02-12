"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const leads_module_1 = require("./leads/leads.module");
const prisma_module_1 = require("./prisma/prisma.module");
const timeline_module_1 = require("./timeline/timeline.module");
const contracts_module_1 = require("./contracts/contracts.module");
const mail_module_1 = require("./mail/mail.module");
const files_module_1 = require("./files/files.module");
const pipelines_module_1 = require("./pipelines/pipelines.module");
const custom_fields_module_1 = require("./custom-fields/custom-fields.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, leads_module_1.LeadsModule, timeline_module_1.TimelineModule, contracts_module_1.ContractsModule, mail_module_1.MailModule, files_module_1.FilesModule, pipelines_module_1.PipelinesModule, custom_fields_module_1.CustomFieldsModule],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map