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
exports.DietService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_diets_entity_1 = require("../entities/user_diets.entity");
const typeorm_2 = require("typeorm");
let DietService = class DietService {
    constructor(user_dietRepository, configService, jwtService) {
        this.user_dietRepository = user_dietRepository;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async findWithDay(day, req) {
        let token = req.headers['authorization'].replace('Bearer ', '');
        const decodedToken = this.jwtService.verify(token, { secret: this.configService.get('SECRET_KEY') });
        let diets = await this.user_dietRepository.find({ where: { user_id: decodedToken.id, log_date: day } });
        return diets;
    }
    async findAll(req) {
        let token = req.headers['authorization'].replace('Bearer ', '');
        const decodedToken = this.jwtService.verify(token, { secret: this.configService.get('SECRET_KEY') });
        let diets = await this.user_dietRepository.find({ where: { user_id: decodedToken.id } });
        return diets;
    }
    async saveData(data) {
        return await this.user_dietRepository.save(data);
    }
    async getUserId(req) {
        let token = req.headers['authorization'].replace('Bearer ', '');
        const decodedToken = this.jwtService.verify(token, { secret: this.configService.get('SECRET_KEY') });
        return decodedToken.id;
    }
    async deleteDietWithId(id) {
        return await this.user_dietRepository.delete({ diet_id: id });
    }
    async deleteDietWithType(data, req) {
        let user = await this.getUserId(req);
        let diet = await this.user_dietRepository.findOne({ where: { user_id: user, diet_type: data.diet_type, log_date: data.log_date } });
        console.log(diet);
        if (diet == null) {
            return null;
        }
        return await this.deleteDietWithId(diet.diet_id);
    }
};
exports.DietService = DietService;
exports.DietService = DietService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_diets_entity_1.User_diets)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        jwt_1.JwtService])
], DietService);
//# sourceMappingURL=diet.service.js.map