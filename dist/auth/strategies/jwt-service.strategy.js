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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshServiceStrategy = exports.JwtServiceStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
let JwtServiceStrategy = class JwtServiceStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-service') {
    constructor(configService) {
        super({
            secretOrKey: configService.get('SECRET_KEY'),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
        this.configService = configService;
    }
    async validate(payload) {
        if (payload.type !== 'access') {
            throw new common_1.UnauthorizedException('Invalid token type');
        }
        return {
            user_id: payload.user_id,
            nickname: payload.nickname,
            createAt: payload.createAt
        };
    }
};
exports.JwtServiceStrategy = JwtServiceStrategy;
exports.JwtServiceStrategy = JwtServiceStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtServiceStrategy);
let JwtRefreshServiceStrategy = class JwtRefreshServiceStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-service') {
    constructor(configService) {
        super({
            secretOrKey: configService.get('SECRET_KEY'),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
        this.configService = configService;
    }
    async validate(payload) {
        return {
            user_id: payload.user_id,
            nickname: payload.nickname,
            createAt: payload.createAt
        };
    }
};
exports.JwtRefreshServiceStrategy = JwtRefreshServiceStrategy;
exports.JwtRefreshServiceStrategy = JwtRefreshServiceStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtRefreshServiceStrategy);
//# sourceMappingURL=jwt-service.strategy.js.map