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
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const user_dto_1 = require("./dto/user.dto");
const local_service_guard_1 = require("./guards/local-service.guard");
const jwt_service_guard_1 = require("./guards/jwt-service.guard");
const google_guard_1 = require("./guards/google.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async postJoin(createUserDto, res) {
        await this.authService.checkPassword(createUserDto);
        createUserDto = await this.authService.hashing(createUserDto);
        let user = await this.authService.postJoin(createUserDto);
        return res.status(common_1.HttpStatus.CREATED).json(user);
    }
    async postLogin(req, res) {
        const token = await this.authService.loginServiceUser(req.user);
        const refreshToken = await this.authService.generateRefreshToken(req.user);
        res.status(common_1.HttpStatus.OK).json({
            info: "success",
            token: await token.token,
            refreshToken: refreshToken
        });
    }
    async googleAuthCallback(req, res) {
        return res.status(common_1.HttpStatus.OK).send();
    }
    async googleAuth(req, res) {
        const data = await this.authService.googleLogin(req);
        res.status(common_1.HttpStatus.OK).json({
            info: "success",
            token: data.token,
            refreshToken: data.refresh
        });
    }
    async getProfile(req, res) {
        let user = await this.authService.findJwtUser(req);
        res.status(common_1.HttpStatus.FOUND).json({
            user_id: user.user_id,
            nickname: user.nickname,
            is_man: user.is_man,
            d_day: user.d_day,
        });
    }
    async changeProfile(userDto, req, res) {
        let user = await this.authService.findJwtUser(req);
        let ans = await this.authService.saveUserData(req, user);
        res.status(common_1.HttpStatus.OK).json(ans);
    }
    async refresh(req, res) {
        let token = req.headers['authorization'].replace('Bearer ', '');
        let refreshTokenDto = { refresh_token: token };
        const newAccessToken = (await this.authService.refresh(refreshTokenDto)).acessToken;
        res.send({ newAccessToken });
        res.status(common_1.HttpStatus.OK);
    }
    async secession(req, res) {
        let user = await this.authService.findJwtUser(req);
        await this.authService.deleteUser(user);
        res.status(common_1.HttpStatus.OK).json(user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('join'),
    (0, swagger_1.ApiOperation)({ summary: '회원가입 api', description: 'User 정보를 생성한다. ' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The User record has been successfully created.',
        type: user_dto_1.UserDto
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "postJoin", null);
__decorate([
    (0, common_1.UseGuards)(local_service_guard_1.LocalServiceStrategy),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '로그인', description: 'User 정보를 대조해 토큰을 발급한다' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.LoginUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'success',
        type: user_dto_1.tokensDto
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "postLogin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '구글 로그인', description: '구글 계정에서 고유 식별 번호를 요청받는다 이후 google/callback으로 리다이렉트 한다' }),
    (0, swagger_1.ApiResponse)({
        type: user_dto_1.tokensDto
    }),
    (0, common_1.Get)('googleLogin'),
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '구글 로그인 리다이렉트', description: '(이쪽으로 직접 요청하지 마세요) 회원 정보가 있을 경우 로그인, 없을 경우 회원가입 후 로그인 한다. ' }),
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '프로필', description: 'get my profile' }),
    (0, swagger_1.ApiResponse)({
        status: 302,
        description: '사용자의 프로필을 반환',
        type: user_dto_1.UserDto
    }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '프로필 수정', description: '프로필 정보, User record의 정보를 수정한다' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'success',
        type: user_dto_1.tokensDto
    }),
    (0, common_1.Post)('changeProfile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changeProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '토큰 refresh', description: 'refresh token을 bearer헤더로 두면 새로운 jwt token을 발급한다' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'success',
        type: user_dto_1.acessTokenDto
    }),
    (0, common_1.Post)('refreshToken'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'secession', description: 'delete user record' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'success',
        type: user_dto_1.UserDto
    }),
    (0, common_1.Delete)('secession'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "secession", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth API'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map