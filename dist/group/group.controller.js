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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const group_service_1 = require("./group.service");
const group_dto_1 = require("./dto/group.dto");
const jwt_service_guard_1 = require("../auth/guards/jwt-service.guard");
const member_dto_1 = require("./dto/member.dto");
const console_1 = require("console");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async makeGroup(body, req, res) {
        try {
            let newGroup = await this.groupService.makeGroup(body.name, req);
            return res.status(common_1.HttpStatus.CREATED).json(newGroup);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: error.message });
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    }
    async checkGroupByCode(body, res) {
        let foundGroup = await this.groupService.findGroupById(body);
        res.status(common_1.HttpStatus.OK).json(foundGroup);
    }
    async checkGroupByUserId(req, res) {
        let memberList = await this.groupService.findMemberByUserId(req);
        res.status(common_1.HttpStatus.OK).json(memberList);
    }
    async enterGroup(body, req, res) {
        try {
            let ans = await this.groupService.enterGroup(body, req);
            res.status(common_1.HttpStatus.CREATED).json(ans);
        }
        catch (error) {
            res.status(common_1.HttpStatus.CONFLICT).json(error);
        }
    }
    async ckeckGroup(body, res) {
        let members = await this.groupService.findGroupMember(body);
        res.status(common_1.HttpStatus.FOUND).json(members);
    }
    async deleteGroup(body, req, res) {
        try {
            let ans = await this.groupService.deleteGroup(body, req);
            res.status(common_1.HttpStatus.OK).json({ message: "succesfully deleted", ans });
        }
        catch (error) {
            res.status(common_1.HttpStatus.UNAUTHORIZED).json(error);
        }
    }
    async forceLeader(body, req, res) {
        let ans = await this.groupService.forceLeader(body, req);
        res.status(common_1.HttpStatus.OK).json(ans);
    }
    async setLeader(body, req, res) {
        try {
            let ans = await this.groupService.setLeader(body, req);
            res.status(common_1.HttpStatus.ACCEPTED).json(ans);
        }
        catch (error) {
            return res.json(error);
        }
    }
    async exitGroup(body, req, res) {
        try {
            let ans = await this.groupService.exitGroup(body, req);
            res.status(common_1.HttpStatus.OK).json(ans);
        }
        catch (error) {
            res.status(common_1.HttpStatus.FORBIDDEN).json(error);
        }
    }
    async checkInvitation(body, req, res) {
        try {
            let ans = await this.groupService.joinWithInvitation(body, req);
            return res.status(common_1.HttpStatus.CREATED).json({ ans });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: error.message });
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
    async makeInvitation(data, res) {
        let ans = await this.groupService.makeInvitation(data);
        res.status(common_1.HttpStatus.OK).json({ ans });
    }
    async deleteInvitation(data, res) {
        let ans = await this.groupService.deleteInvitation(data);
        res.status(common_1.HttpStatus.OK).json({ ans });
    }
    async getGroupScore(body, res) {
        let ans = await this.groupService.getGroupScore(body);
        res.status(common_1.HttpStatus.FOUND).json(ans);
    }
    async setGroupScore(body, res) {
        let ans = await this.groupService.setGroupScore(body);
        res.status(common_1.HttpStatus.ACCEPTED).json(ans);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 생성', description: '그룹을 생성한다 (family record 생성)' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.CreateGroupDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The Group record has been successfully created.' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'success',
        type: group_dto_1.GroupDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'BAD_REQUEST'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'INTERNAL_SERVER_ERROR'
    }),
    (0, common_1.Post)('makeGroup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.CreateGroupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "makeGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 검색 (group id)', description: '해당 그룹 코드를 가진 그룹을 찾는다' }),
    (0, swagger_1.ApiBody)({ type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'found', type: group_dto_1.GroupDto }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)('checkGroupByCode'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "checkGroupByCode", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 검색 (user_id)', description: '해당 유저를 포함하는 그룹 연결을 찾는다' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'found *List로 반환합니다*', type: group_dto_1.GroupDto }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)('checkGroupByUserId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "checkGroupByUserId", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 가입', description: 'group id와 user id를 포함하는 group_members record를 생성한다' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.CreateGroupDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'success', type: group_dto_1.GroupDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'fail' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)('enterGroup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "enterGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 멤버 조회', description: '그룹에 포함되어 있는 사용자들의 리스트를 반환한다. ' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.CreateGroupDto }),
    (0, swagger_1.ApiResponse)({ status: 302, description: 'success *List로 반환합니다*', type: group_dto_1.GroupDto }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)('ckeckGroup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "ckeckGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 삭제', description: '그룹과 해당 그룹이 포함된 멤버의 레코드를 모두 삭제합니다. ' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.CreateGroupDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'success (지워진 그룹 반환)', type: console_1.group }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'fail' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Delete)('deleteGroup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '리더 강요 (이거 쓰지 마세요, 테스트할 때만 쓰세요!!)', description: '리더를 강제합니ㄷ ' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.SearchGroupDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'success', type: member_dto_1.MemberDto }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)('forceLeader'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Request, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "forceLeader", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '리더 설정', description: '리더가 다른 멤버를 리더로 설정합니다. 자신은 리더를 박탈당합니다' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.SearchGroupDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'success (지정한 사람)', type: member_dto_1.MemberDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'fail - 리더가 아님' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'fail - 멤버가 유효하지 않음' }),
    (0, common_1.Post)('setLeader'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.SetLeaderDto, Request, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "setLeader", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '그룹 탈퇴', description: '그룹을 탈퇴합니다. 리더는 탈퇴가 불가능합니다' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.SearchGroupDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'success', type: member_dto_1.MemberDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'fail - leader일 경우' }),
    (0, common_1.Delete)('exitGroup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Request, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "exitGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 가입', description: '사용자를 그룹에 가입시킨다, 초대코드와 대조 후 추가한다. ' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.GroupCodeDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'success', type: member_dto_1.MemberDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'fail - 그룹이 존재하지 않음' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'fail - 이미 가입됨' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)('joinWithInvitation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.GroupCodeDto, Request, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "checkInvitation", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 초대코드 생성', description: '그룹 초대 코드를 생성한다, 기존의 초대 코드가 있다면 초기화한다. ' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.SearchGroupDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Generated Code',
        type: group_dto_1.GroupDto
    }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)('makeInvitation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "makeInvitation", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 초대코드 삭제', description: '그룹 초대 코드를 삭제합니다 (해당 속성을 null로 만듭니다) ' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.SearchGroupDto }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'success', type: group_dto_1.GroupDto }),
    (0, common_1.Delete)('deleteInvitation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteInvitation", null);
__decorate([
    (0, common_1.Post)('getGroupScore'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹원들 점수 합산', description: '그룹원들의 점수를 합산해서 반환합니다. (팀점수를 반환합니다)' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.SearchGroupDto }),
    (0, swagger_1.ApiResponse)({ status: 302, description: 'success' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getGroupScore", null);
__decorate([
    (0, common_1.Post)('setGroupScore'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹원들 점수 설정', description: '그룹원들의 점수를 합산해서 저장합니다. (팀점수를 저장합니다)' }),
    (0, swagger_1.ApiBody)({ type: group_dto_1.SearchGroupDto }),
    (0, swagger_1.ApiResponse)({ status: 202, description: 'success' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.SearchGroupDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "setGroupScore", null);
exports.GroupController = GroupController = __decorate([
    (0, swagger_1.ApiTags)('group API'),
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupController);
//# sourceMappingURL=group.controller.js.map