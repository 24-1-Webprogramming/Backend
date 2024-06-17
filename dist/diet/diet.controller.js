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
exports.DietController = void 0;
const common_1 = require("@nestjs/common");
const diet_service_1 = require("./diet.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_service_guard_1 = require("../auth/guards/jwt-service.guard");
const diet_dto_1 = require("./dto/diet.dto");
const find_diet_dto_1 = require("./dto/find-diet.dto");
const delete_diet_dto_1 = require("./dto/delete-diet.dto");
let DietController = class DietController {
    constructor(dietService) {
        this.dietService = dietService;
    }
    async setDiet(body, req, res) {
        let data = body;
        data.user_id = await this.dietService.getUserId(req);
        await this.dietService.saveData(data);
        res.status(common_1.HttpStatus.CREATED).json({
            info: "create new diet"
        });
    }
    async findWithDay(body, req, res) {
        let diets = await this.dietService.findWithDay(body.log_date, req);
        console.log(diets);
        if (diets.length == 0) {
            res.status(common_1.HttpStatus.NO_CONTENT).json();
        }
        res.status(common_1.HttpStatus.FOUND).json(diets);
    }
    async findAll(req, res) {
        let diets = await this.dietService.findAll(req);
        if (diets.length == 0) {
            res.status(common_1.HttpStatus.NO_CONTENT).json();
        }
        res.status(common_1.HttpStatus.FOUND).json(diets);
    }
    async deleteWithId(body, req, res) {
        await this.dietService.deleteDietWithId(body.id);
        res.status(common_1.HttpStatus.OK).json({
            info: "deleted"
        });
    }
    async deleteWithType(body, req, res) {
        let ans = await this.dietService.deleteDietWithType(body, req);
        if (ans == null) {
            res.status(common_1.HttpStatus.NO_CONTENT).json({ info: "failed" });
        }
        else {
            res.status(common_1.HttpStatus.OK).json({
                info: "deleted"
            });
        }
    }
};
exports.DietController = DietController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '식단 등록', description: '새로운 식단을 등록한다 만약 존재한다면 덮어쓴다' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'success',
        type: String
    }),
    (0, swagger_1.ApiBody)({ type: diet_dto_1.dietDto }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)("setDiet"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [diet_dto_1.dietDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DietController.prototype, "setDiet", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("findWithDay"),
    (0, swagger_1.ApiResponse)({
        status: 302,
        description: 'success',
        type: diet_dto_1.dietDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'no diets'
    }),
    (0, swagger_1.ApiOperation)({ summary: '식단 검색 (날짜)', description: '해당 사용자가 해당 날짜에 등록해둔 식단을 반환한다' }),
    (0, swagger_1.ApiBody)({ type: find_diet_dto_1.FindDietDto }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_diet_dto_1.FindDietDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DietController.prototype, "findWithDay", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("findAll"),
    (0, swagger_1.ApiResponse)({
        status: 302,
        description: 'success *결과는 리스트로 출력됩니다*',
        type: diet_dto_1.dietDto
    }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '식단 검색 (전체)', description: '해당 사용자의 모든 식단을 반환한다' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DietController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("deleteWithId"),
    (0, swagger_1.ApiOperation)({ summary: '식단 정보 삭제 (id)', description: '해당 id를 가진 식단 record를 삭제한다.' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, swagger_1.ApiBody)({ type: delete_diet_dto_1.DeleteDieWithIdtDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_diet_dto_1.DeleteDieWithIdtDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DietController.prototype, "deleteWithId", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("deleteWithType"),
    (0, swagger_1.ApiOperation)({ summary: '식단 검색 (날짜, 종류)', description: '해당 사용자가 해당 날짜에 등록해둔 해당 종류의 식단을 삭제한다.' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, swagger_1.ApiBody)({ type: delete_diet_dto_1.DeleteDieWithTypeDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_diet_dto_1.DeleteDieWithTypeDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DietController.prototype, "deleteWithType", null);
exports.DietController = DietController = __decorate([
    (0, swagger_1.ApiTags)('diet API'),
    (0, common_1.Controller)('diet'),
    __metadata("design:paramtypes", [diet_service_1.DietService])
], DietController);
//# sourceMappingURL=diet.controller.js.map