"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const common_1 = require("@nestjs/common");
const group_controller_1 = require("./group.controller");
const group_service_1 = require("./group.service");
const typeorm_1 = require("@nestjs/typeorm");
const groups_entity_1 = require("../entities/groups.entity");
const group_members_entity_1 = require("../entities/group_members.entity");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_service_strategy_1 = require("../auth/strategies/jwt-service.strategy");
const users_entity_1 = require("../entities/users.entity");
const user_stats_entity_1 = require("../entities/user_stats.entity");
let GroupModule = class GroupModule {
};
exports.GroupModule = GroupModule;
exports.GroupModule = GroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.Users, groups_entity_1.Group, group_members_entity_1.GroupMember, user_stats_entity_1.Stat]),
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
        controllers: [group_controller_1.GroupController],
        providers: [group_service_1.GroupService, jwt_service_strategy_1.JwtServiceStrategy],
        exports: [GroupModule]
    })
], GroupModule);
//# sourceMappingURL=group.module.js.map