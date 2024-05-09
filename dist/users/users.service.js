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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const users_entity_1 = require("../database/users.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
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
            console.log(`count ${numberOfTypes}`);
            return false;
        }
        return true;
    }
    async checkDuplication(createUserDto) {
        const id = createUserDto.id;
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (user) {
            return false;
        }
        return true;
    }
    async sign_up(createUserDto) {
        console.log(createUserDto.password);
        createUserDto.password = await bcrypt.hash(createUserDto.password, 11);
        console.log(createUserDto);
        this.userRepository.save(createUserDto);
    }
    async leave(createUserDto) {
        console.log(createUserDto);
    }
    async findOne(id) {
        return this.userRepository.findOne({ where: { id: id } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map