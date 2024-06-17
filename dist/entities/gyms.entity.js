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
exports.Gym = void 0;
const typeorm_1 = require("typeorm");
let Gym = class Gym {
};
exports.Gym = Gym;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Gym.prototype, "gym_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Gym.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], Gym.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], Gym.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, nullable: true }),
    __metadata("design:type", Boolean)
], Gym.prototype, "is_one_day", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, nullable: true }),
    __metadata("design:type", Boolean)
], Gym.prototype, "is_ot_free", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, nullable: true }),
    __metadata("design:type", Boolean)
], Gym.prototype, "is_inbody", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Gym.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "price_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "image_path", void 0);
exports.Gym = Gym = __decorate([
    (0, typeorm_1.Entity)('gyms')
], Gym);
//# sourceMappingURL=gyms.entity.js.map