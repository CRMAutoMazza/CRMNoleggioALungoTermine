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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelinesController = void 0;
const common_1 = require("@nestjs/common");
const pipelines_service_1 = require("./pipelines.service");
const client_1 = require("@prisma/client");
let PipelinesController = class PipelinesController {
    constructor(pipelinesService) {
        this.pipelinesService = pipelinesService;
    }
    create(createPipelineDto) {
        return this.pipelinesService.create(createPipelineDto);
    }
    findAll(tenantId) {
        return this.pipelinesService.findAll(tenantId);
    }
    findOne(id) {
        return this.pipelinesService.findOne(id);
    }
    update(id, updatePipelineDto) {
        return this.pipelinesService.update(id, updatePipelineDto);
    }
    remove(id) {
        return this.pipelinesService.remove(id);
    }
    createStage(createStageDto) {
        return this.pipelinesService.createStage(createStageDto);
    }
    updateStage(id, updateStageDto) {
        return this.pipelinesService.updateStage(id, updateStageDto);
    }
    removeStage(id) {
        return this.pipelinesService.removeStage(id);
    }
};
exports.PipelinesController = PipelinesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('tenantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('stages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "createStage", null);
__decorate([
    (0, common_1.Patch)('stages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "updateStage", null);
__decorate([
    (0, common_1.Delete)('stages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "removeStage", null);
exports.PipelinesController = PipelinesController = __decorate([
    (0, common_1.Controller)('pipelines'),
    __metadata("design:paramtypes", [pipelines_service_1.PipelinesService])
], PipelinesController);
//# sourceMappingURL=pipelines.controller.js.map