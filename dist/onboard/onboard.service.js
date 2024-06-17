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
exports.OnboardService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const onboard_conditions_entity_1 = require("../entities/onboard_conditions.entity");
const typeorm_2 = require("typeorm");
let OnboardService = class OnboardService {
    constructor(onboardRepository, configService, jwtService) {
        this.onboardRepository = onboardRepository;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async findOnboard(req) {
        let token = req.headers['authorization'].replace('Bearer ', '');
        const decodedToken = this.jwtService.verify(token, { secret: this.configService.get('SECRET_KEY') });
        let onboard = await this.onboardRepository.findOne({ where: { user_id: decodedToken.id } });
        return onboard;
    }
    async saveData(data) {
        return await this.onboardRepository.save(data);
    }
    async deleteData(data) {
        return await this.onboardRepository.delete({ user_id: data.user_id });
    }
};
exports.OnboardService = OnboardService;
exports.OnboardService = OnboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(onboard_conditions_entity_1.Onboard_conditions)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        jwt_1.JwtService])
], OnboardService);
//# sourceMappingURL=onboard.service.js.map