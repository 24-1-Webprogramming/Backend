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
exports.GymService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const gyms_entity_1 = require("../entities/gyms.entity");
const typeorm_2 = require("typeorm");
const image_assets_entity_1 = require("../entities/image_assets.entity");
let GymService = class GymService {
    constructor(gymRepository, image_assetsRepository, jwtService) {
        this.gymRepository = gymRepository;
        this.image_assetsRepository = image_assetsRepository;
        this.jwtService = jwtService;
    }
    async findByLocal(local) {
        const gymList = await this.gymRepository.createQueryBuilder('gym')
            .where('gym.address LIKE :address', { address: `%${local.address}%` })
            .getMany();
        let finalGymList = gymList;
        return finalGymList;
    }
};
exports.GymService = GymService;
exports.GymService = GymService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gyms_entity_1.Gym)),
    __param(1, (0, typeorm_1.InjectRepository)(image_assets_entity_1.Image_assets)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], GymService);
//# sourceMappingURL=gym.service.js.map