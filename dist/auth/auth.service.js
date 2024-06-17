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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require('bcrypt');
let AuthService = class AuthService {
    constructor(userRepository, configService, jwtService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async postJoin(createUserDto) {
        return await this.userRepository.save(createUserDto);
    }
    async checkPassword(createUserDto) {
        let min_password = 8;
        if (createUserDto.password.length < min_password) {
            console.log("short password");
            return false;
        }
        let hasUppercase = /[A-Z]/.test(createUserDto.password);
        let hasLowercase = /[a-z]/.test(createUserDto.password);
        let hasNumber = /[0-9]/.test(createUserDto.password);
        let hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(createUserDto.password);
        let characterTypes = [hasUppercase, hasLowercase, hasNumber, hasSpecial];
        let numberOfTypes = characterTypes.filter(Boolean).length;
        if (numberOfTypes < 3) {
            return false;
        }
        return true;
    }
    async hashing(createUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 11);
        return createUserDto;
    }
    async validateServiceUser(id, password) {
        const user = await this.userRepository.findOne({ where: { user_id: id } });
        if (!user) {
            throw new common_1.ForbiddenException(`there's no user with id ${id}`);
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.ForbiddenException('password is not matched');
        }
        return user;
    }
    async loginServiceUser(user) {
        const payload = {
            type: 'access',
            id: user.user_id,
        };
        return {
            token: this.jwtService.signAsync(payload),
        };
    }
    async generateRefreshToken(user) {
        const payload = {
            type: 'refresh',
            id: user.user_id,
        };
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('SECRET_KEY'),
            expiresIn: '2w',
        });
    }
    async refresh(refreshTokenDto) {
        const { refresh_token } = refreshTokenDto;
        const decodeRefreshToken = this.jwtService.verify(refresh_token, { secret: this.configService.get('SECRET_KEY') });
        const user_id = decodeRefreshToken.user_id;
        const user = await this.userRepository.findOne({ where: { user_id: user_id } });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const accessToken = await this.generateRefreshToken(user);
        return { acessToken: accessToken };
    }
    async googleLogin(req) {
        let user = await this.userRepository.findOne({ where: { 'user_id': await req.user.providerId } });
        if (!user) {
            const input = {
                user_id: await req.user.providerId,
                nickname: null,
                is_man: null,
                d_day: null,
                password: null,
            };
            user = await this.postJoin(input);
        }
        let data = {
            token: await (await this.loginServiceUser(user)).token,
            refresh: await this.generateRefreshToken(user)
        };
        return data;
    }
    async findJwtUser(req) {
        let token = req.headers['authorization'].replace('Bearer ', '');
        const decodeToken = this.jwtService.verify(token, { secret: this.configService.get('SECRET_KEY') });
        return await this.userRepository.findOne({ where: { user_id: decodeToken.user_id } });
    }
    async deleteUser(user) {
        let ans = await this.userRepository.delete({ user_id: user.user_id });
    }
    async saveUserData(req, user) {
        let userData = await this.findJwtUser(req);
        userData.nickname = user.nickname;
        userData.is_man = user.is_man;
        userData.d_day = user.d_day;
        return await this.userRepository.save(userData);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map