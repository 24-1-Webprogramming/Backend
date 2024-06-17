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
exports.GymDto = exports.SearchGymDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SearchGymDto {
}
exports.SearchGymDto = SearchGymDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchGymDto.prototype, "address", void 0);
class GymDto {
}
exports.GymDto = GymDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gym ID' }),
    __metadata("design:type", Number)
], GymDto.prototype, "gym_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the gym' }),
    __metadata("design:type", String)
], GymDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address of the gym' }),
    __metadata("design:type", String)
], GymDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude of the gym location' }),
    __metadata("design:type", Number)
], GymDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude of the gym location' }),
    __metadata("design:type", Number)
], GymDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if it is a one-day pass' }),
    __metadata("design:type", Number)
], GymDto.prototype, "is_one_day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if OT is free' }),
    __metadata("design:type", Number)
], GymDto.prototype, "is_ot_free", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if Inbody is available' }),
    __metadata("design:type", Number)
], GymDto.prototype, "is_inbody", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price of the gym service' }),
    __metadata("design:type", Number)
], GymDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of the price' }),
    __metadata("design:type", String)
], GymDto.prototype, "price_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Image path for the gym' }),
    __metadata("design:type", String)
], GymDto.prototype, "image_path", void 0);
//# sourceMappingURL=gym.dto.js.map