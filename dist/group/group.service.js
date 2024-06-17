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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const group_members_entity_1 = require("../entities/group_members.entity");
const groups_entity_1 = require("../entities/groups.entity");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_stats_entity_1 = require("../entities/user_stats.entity");
let GroupService = class GroupService {
    constructor(userRepository, groupRepository, memberRepository, statRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.memberRepository = memberRepository;
        this.statRepository = statRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    generateRandomCode(length) {
        return (0, crypto_1.randomBytes)(length / 2).toString('hex');
    }
    async findJwtUser(req) {
        let token = req.headers['authorization'].replace('Bearer ', '');
        const decodeToken = this.jwtService.verify(token, { secret: this.configService.get('SECRET_KEY') });
        return await this.userRepository.findOne({ where: { user_id: decodeToken.id } });
    }
    async findUserScore(user_id) {
        return await this.statRepository.findOne({ where: { user_id: user_id } });
    }
    async makeGroup(name, req) {
        let legacy = await this.groupRepository.findOne({ where: { name: name } });
        if (legacy) {
            throw new common_1.BadRequestException('group name is already exist');
        }
        const newGroup = this.groupRepository.create({ name });
        let createdGroup = await this.groupRepository.save(newGroup);
        let memberData = {
            user_id: (await this.findJwtUser(req)).user_id,
            group_id: createdGroup.family_id,
            is_leader: true
        };
        const newMember = await this.memberRepository.save(memberData);
        return createdGroup;
    }
    async findGroupMember(data) {
        return await this.memberRepository.find({ where: { group_id: data.search_id } });
    }
    async deleteGroup(data, req) {
        let group = await this.findGroupById(data);
        let user = await this.findJwtUser(req);
        let leader = await this.memberRepository.findOne({ where: { group_id: data.search_id, user_id: user.user_id } });
        if (!leader.is_leader) {
            throw new common_1.UnauthorizedException("You are not a leader");
        }
        let members = await this.findGroupMember(data);
        for (let member of members) {
            await this.memberRepository.delete(member);
        }
        return await this.groupRepository.delete(group);
    }
    async findGroupById(code) {
        return await this.groupRepository.findOne({ where: { family_id: code.search_id } });
    }
    async findMemberByUserId(req) {
        const user = await this.findJwtUser(req);
        return await this.memberRepository.find({ where: { user_id: user.user_id } });
    }
    async findMemberByGroupId(data) {
        return await this.memberRepository.find({ where: { group_id: data.search_id } });
    }
    async searchGroupByCode(code) {
        return await this.groupRepository.findOne({ where: { group_code: code.code } });
    }
    async makeInvitation(data) {
        let dup = true;
        let randCode = "";
        while (dup) {
            randCode = await this.generateRandomCode(16);
            let searchCode = { code: randCode };
            let ans = await this.searchGroupByCode(searchCode);
            if (!ans) {
                dup = false;
            }
        }
        let foundGroup = await this.findGroupById(data);
        let newGroup = foundGroup;
        newGroup.group_code = randCode;
        return await this.groupRepository.save(newGroup);
    }
    async deleteInvitation(data) {
        let group = await this.findGroupById(data);
        group.group_code = null;
        return await this.groupRepository.save(group);
    }
    async joinWithInvitation(data, req) {
        let group = await this.searchGroupByCode(data);
        if (!group) {
            throw new common_1.NotFoundException(`There no groupcode is ${data.code}`);
        }
        let member = await this.findMemberByUserId(req);
        member.forEach((g) => {
            if (group.family_id == g.group_id) {
                throw new common_1.InternalServerErrorException(`Already Joined`);
            }
        });
        let user = await this.findJwtUser(req);
        let newMember = {
            user_id: user.user_id,
            group_id: group.family_id,
            is_leader: false
        };
        return await this.memberRepository.save(newMember);
    }
    async exitGroup(data, req) {
        const group = await this.findGroupById(data);
        const user = await this.findJwtUser(req);
        const member = await this.memberRepository.findOne({
            where: { group_id: group.family_id, user_id: user.user_id }
        });
        if (member.is_leader == true) {
            throw new common_1.ForbiddenException(`leader can't exit group`);
        }
        return await this.memberRepository.delete(member);
    }
    async getGroupScore(data) {
        const members = await this.findMemberByGroupId(data);
        if (members.length == 0) {
            return { score: 0 };
        }
        let totalScore = 0;
        for (let member of members) {
            let score = (await this.findUserScore(member.user_id));
            if (score != null) {
                totalScore += score.health_score;
            }
        }
        return { score: totalScore };
    }
    async setGroupScore(data) {
        const newScore = await this.getGroupScore(data);
        const group = await this.findGroupById(data);
        group.score = newScore.score;
        return await this.groupRepository.save(group);
    }
    async enterGroup(data, req) {
        const group = await this.findGroupById(data);
        const user = await this.findJwtUser(req);
        let member = await this.memberRepository.findOne({ where: { group_id: data.search_id, user_id: user.user_id } });
        if (member != null) {
            throw new common_1.ConflictException(`alreay exist`);
        }
        let memberData = {
            user_id: user.user_id,
            group_id: group.family_id,
            is_leader: false
        };
        return await this.memberRepository.save(memberData);
    }
    async forceLeader(data, req) {
        const user = await this.findJwtUser(req);
        let member = await this.memberRepository.findOne({ where: { group_id: data.search_id, user_id: user.user_id } });
        if (member == null) {
            throw new common_1.NotFoundException(`not found`);
        }
        member.is_leader = true;
        return await this.memberRepository.save(member);
    }
    async setLeader(data, req) {
        const user = await this.findJwtUser(req);
        let leader = await this.memberRepository.findOne({ where: { group_id: data.group_id, user_id: user.user_id } });
        if (leader.is_leader == false) {
            throw new common_1.UnauthorizedException('You are not leader');
        }
        let member = await this.memberRepository.findOne({ where: { group_id: data.group_id, user_id: data.target_user_id } });
        if (member == null) {
            throw new common_1.NotFoundException(`There's no member with id ${data.target_user_id}`);
        }
        leader.is_leader = false;
        member.is_leader = true;
        await this.memberRepository.save(leader);
        return await this.memberRepository.save(member);
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(groups_entity_1.Group)),
    __param(2, (0, typeorm_1.InjectRepository)(group_members_entity_1.GroupMember)),
    __param(3, (0, typeorm_1.InjectRepository)(user_stats_entity_1.Stat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], GroupService);
//# sourceMappingURL=group.service.js.map