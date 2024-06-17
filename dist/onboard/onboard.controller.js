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
exports.OnboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const onboard_service_1 = require("./onboard.service");
const jwt_service_guard_1 = require("../auth/guards/jwt-service.guard");
const onboard_dto_1 = require("./dto/onboard.dto");
let OnboardController = class OnboardController {
    constructor(onboardService) {
        this.onboardService = onboardService;
    }
    async setOnboard(body, req, res) {
        let onboard = await this.onboardService.findOnboard(req);
        await this.onboardService.saveData(body);
        let info = (onboard = null) ? "successfully created" : "successfully changed";
        res.status(common_1.HttpStatus.CREATED).json({
            info: info
        });
    }
    async checkOnboard(req, res) {
        let onboard = await this.onboardService.findOnboard(req);
        res.status(common_1.HttpStatus.OK).json(onboard);
    }
    async deleteOnboard(req, res) {
        let onboard = await this.onboardService.findOnboard(req);
        if (onboard == null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({});
        }
        let del = await this.onboardService.deleteData(onboard);
        res.status(common_1.HttpStatus.OK).json(del);
    }
};
exports.OnboardController = OnboardController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'onboard 설정', description: '사용자의 onboard를 설정한다. 없으면 생성하고, 있으면 덮어쓴다. ' }),
    (0, common_1.Post)("setOnboard"),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'success' }),
    (0, swagger_1.ApiBody)({ type: onboard_dto_1.onboardDto }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OnboardController.prototype, "setOnboard", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'onboard 조회', description: '사용자의 onboard를 조회한다. ' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'success', type: onboard_dto_1.onboardDto }),
    (0, common_1.Post)("checkOnboard"),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OnboardController.prototype, "checkOnboard", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'onboard 삭제', description: '사용자의 onboard를 삭제한다. ' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'success - 삭제된 온보딩', type: onboard_dto_1.onboardDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'failed - 온보딩 없음' }),
    (0, common_1.Delete)("removeOnboard"),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OnboardController.prototype, "deleteOnboard", null);
exports.OnboardController = OnboardController = __decorate([
    (0, swagger_1.ApiTags)('onboard api'),
    (0, common_1.Controller)('onboard'),
    __metadata("design:paramtypes", [onboard_service_1.OnboardService])
], OnboardController);
//# sourceMappingURL=onboard.controller.js.map