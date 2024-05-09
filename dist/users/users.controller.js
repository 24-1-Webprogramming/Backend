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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const login_input_dto_1 = require("./dto/login_input.dto");
const auth_service_1 = require("../auth/auth.service");
const bcrypt = require("bcrypt");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async create(createUserDto) {
        createUserDto.type = "manual";
        let con1 = await this.usersService.checkPassword(createUserDto);
        let con2 = await this.usersService.checkDuplication(createUserDto);
        console.log(con1);
        if (!con1) {
            return { "status": "fail", "message": "inappropriate password" };
        }
        else if (!con2) {
            return { "status": "fail", "message": "duplicated id" };
        }
        await this.usersService.sign_up(createUserDto);
        return { "message": `account succesfully created : (${createUserDto.name})` };
    }
    async login(input, res) {
        const { id, password } = input;
        const user = await this.usersService.findOne(id);
        console.log(user);
        if (!user) {
            throw new common_1.UnprocessableEntityException('account does not exist');
        }
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) {
            throw new common_1.UnprocessableEntityException('password is not matched');
        }
        const jwt = this.authService.getAccessToken({ user });
        res.cookie('token', jwt, { httpOnly: true });
        return res.status(200).send(jwt);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('/sign_up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_dto_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map