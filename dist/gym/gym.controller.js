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
exports.GymController = void 0;
const common_1 = require("@nestjs/common");
const gym_service_1 = require("./gym.service");
const swagger_1 = require("@nestjs/swagger");
const gym_dto_1 = require("./dto/gym.dto");
let GymController = class GymController {
    constructor(gymService) {
        this.gymService = gymService;
    }
    async searchGymByLocal(body, res) {
        let gymList = await this.gymService.findByLocal(body);
        res.status(common_1.HttpStatus.OK).json(gymList);
    }
};
exports.GymController = GymController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('searchGymByLocal'),
    (0, swagger_1.ApiOperation)({ summary: '헬스장 검색 AI', description: '해당 지역의 헬스장을 찾는다 ex) "상도동" ' }),
    (0, swagger_1.ApiBody)({ type: gym_dto_1.SearchGymDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'FOUND', type: gym_dto_1.GymDto }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'NOT_FOUND' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_dto_1.SearchGymDto, Object]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "searchGymByLocal", null);
exports.GymController = GymController = __decorate([
    (0, swagger_1.ApiTags)('gym API'),
    (0, common_1.Controller)('gym'),
    __metadata("design:paramtypes", [gym_service_1.GymService])
], GymController);
//# sourceMappingURL=gym.controller.js.map