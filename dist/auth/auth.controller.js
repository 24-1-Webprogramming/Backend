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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../database/users.entity");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(userRepository, userService, authService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.authService = authService;
    }
    async googleAuth() {
    }
    async googleAuthCallback(req, res) {
        let user = await this.userRepository.findOne({ where: { "id": req.user.providerId } });
        console.log(req.user.providerId);
        if (!user) {
            const input = {
                type: "google",
                id: await req.user.providerId,
                password: 'OAuth',
                name: await req.user.name,
                age: 0,
            };
            await this.userService.sign_up(input);
        }
        this.authService.setRefreshToken({ user, res });
        const jwt = this.authService.getAccessToken({ user });
        res.cookie('token', jwt, { httpOnly: true });
        return res.status(200).send(jwt);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map