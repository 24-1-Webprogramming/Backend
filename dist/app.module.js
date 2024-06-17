"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_entity_1 = require("./entities/users.entity");
require("reflect-metadata");
const typeorm_1 = require("@nestjs/typeorm");
const onboard_conditions_entity_1 = require("./entities/onboard_conditions.entity");
const onboard_module_1 = require("./onboard/onboard.module");
const diet_module_1 = require("./diet/diet.module");
const user_diets_entity_1 = require("./entities/user_diets.entity");
const config_1 = require("@nestjs/config");
const group_module_1 = require("./group/group.module");
const groups_entity_1 = require("./entities/groups.entity");
const group_members_entity_1 = require("./entities/group_members.entity");
const gym_module_1 = require("./gym/gym.module");
const gyms_entity_1 = require("./entities/gyms.entity");
const image_assets_entity_1 = require("./entities/image_assets.entity");
const user_stats_entity_1 = require("./entities/user_stats.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env.dev',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: 'health',
                entities: [users_entity_1.Users, onboard_conditions_entity_1.Onboard_conditions, user_diets_entity_1.User_diets, groups_entity_1.Group, group_members_entity_1.GroupMember, gyms_entity_1.Gym, image_assets_entity_1.Image_assets, user_stats_entity_1.Stat],
                synchronize: false,
                logging: false,
            }),
            auth_module_1.AuthModule,
            onboard_module_1.OnboardModule,
            diet_module_1.DietModule,
            group_module_1.GroupModule,
            gym_module_1.GymModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map