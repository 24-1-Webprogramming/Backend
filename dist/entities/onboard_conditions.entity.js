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
exports.Onboard_conditions = void 0;
const typeorm_1 = require("typeorm");
let Onboard_conditions = class Onboard_conditions {
};
exports.Onboard_conditions = Onboard_conditions;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Onboard_conditions.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, default: null }),
    __metadata("design:type", String)
], Onboard_conditions.prototype, "purpose", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', width: 5, nullable: true, default: null }),
    __metadata("design:type", Number)
], Onboard_conditions.prototype, "period", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', width: 5, nullable: true, default: null }),
    __metadata("design:type", Number)
], Onboard_conditions.prototype, "push_up", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', width: 6, nullable: true, default: null }),
    __metadata("design:type", Number)
], Onboard_conditions.prototype, "goal", void 0);
exports.Onboard_conditions = Onboard_conditions = __decorate([
    (0, typeorm_1.Entity)('onboard_conditions')
], Onboard_conditions);
//# sourceMappingURL=onboard_conditions.entity.js.map