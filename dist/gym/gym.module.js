"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymModule = void 0;
const common_1 = require("@nestjs/common");
const gym_service_1 = require("./gym.service");
const gym_controller_1 = require("./gym.controller");
const gyms_entity_1 = require("../entities/gyms.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const image_assets_entity_1 = require("../entities/image_assets.entity");
let GymModule = class GymModule {
};
exports.GymModule = GymModule;
exports.GymModule = GymModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([gyms_entity_1.Gym, image_assets_entity_1.Image_assets]),
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        secret: configService.get('SECRET_KEY'),
                        signOptions: { expiresIn: '5m' }
                    };
                },
                inject: [config_1.ConfigService]
            })
        ],
        providers: [gym_service_1.GymService],
        controllers: [gym_controller_1.GymController],
        exports: [GymModule]
    })
], GymModule);
//# sourceMappingURL=gym.module.js.map