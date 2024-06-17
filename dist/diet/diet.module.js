"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietModule = void 0;
const common_1 = require("@nestjs/common");
const diet_service_1 = require("./diet.service");
const diet_controller_1 = require("./diet.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_diets_entity_1 = require("../entities/user_diets.entity");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_service_strategy_1 = require("../auth/strategies/jwt-service.strategy");
let DietModule = class DietModule {
};
exports.DietModule = DietModule;
exports.DietModule = DietModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_diets_entity_1.User_diets]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env.dev',
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        secret: configService.get('SECRET_KEY'),
                        signOptions: { expiresIn: '5m' },
                    };
                },
                inject: [config_1.ConfigService],
            })
        ],
        providers: [diet_service_1.DietService, jwt_service_strategy_1.JwtServiceStrategy],
        controllers: [diet_controller_1.DietController]
    })
], DietModule);
//# sourceMappingURL=diet.module.js.map