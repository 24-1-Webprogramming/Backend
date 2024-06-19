import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { GroupMember } from 'src/entities/group_members.entity';
import { Group } from 'src/entities/groups.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto, SetLeaderDto } from './dto/member.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateGroupDto, GroupCodeDto, SearchGroupDto, SetGroupDto } from './dto/group.dto';
import { Stat } from 'src/entities/user_stats.entity';
import { UserIdDto } from 'src/diet/dto/find-diet.dto';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(GroupMember)
        private readonly memberRepository: Repository<GroupMember>,
        @InjectRepository(Stat)
        private readonly statRepository: Repository<Stat>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}
    
    generateRandomCode(length: number){
        return randomBytes(length/2).toString('hex');
    }

    async findJwtUser(req){
        let token: string = req.headers['authorization'].replace('Bearer ', '');
        const decodeToken = this.jwtService.verify(token, {secret: this.configService.get('SECRET_KEY')});
        return await this.userRepository.findOne({where:{user_id: decodeToken.id}});
    }

    async findUserScore(user_id: string){
        return await this.statRepository.findOne({where: {user_id: user_id}});
    }

    async makeGroup(data: CreateGroupDto){
        let legacy = await this.groupRepository.findOne({where: {name: data.name}});
        if (legacy){
            throw new BadRequestException('group name is already exist');
        }
        const newGroup = this.groupRepository.create({ name: data.name });
        let createdGroup = await this.groupRepository.save(newGroup);

        //사용자(멤버) 등록
        let memberData: CreateMemberDto = {
            user_id: data.user_id,
            group_id: createdGroup.family_id,
            is_leader: true
        }
        const newMember = await this.memberRepository.save(memberData);
        
        return createdGroup;
    }

    async findGroupMember(data: SearchGroupDto){
        return await this.memberRepository.find({where: {group_id: data.search_id}});
    }

    async deleteGroup(data: SearchGroupDto) {
        let group = await this.findGroupById(data);
        let leader = await this.memberRepository.findOne({where: {group_id: data.search_id, user_id: data.user_id}});
        if (!leader.is_leader) { throw new UnauthorizedException("You are not a leader"); }
        let members = await this.findGroupMember(data);
        for (let member of members) {
            await this.memberRepository.delete(member);
        }
        return await this.groupRepository.delete(group);
    }

    async findGroupById(code: SearchGroupDto){
        return await this.groupRepository.findOne({where:{family_id: code.search_id}});
    }

    async findMemberByUserId(data: UserIdDto){
        return await this.memberRepository.find({where:{user_id:data.user_id}});
    }

    async findMemberByGroupId(data: SearchGroupDto){
        return await this.memberRepository.find({where:{group_id: data.search_id}});
    }

    async searchGroupByCode(code: GroupCodeDto){
        return await this.groupRepository.findOne({where:{group_code: code.code}});
    }

    async makeInvitation(data: SearchGroupDto){
        let dup: Boolean = true;
        let randCode = ""
        while(dup){
            randCode = await this.generateRandomCode(16);
            let searchCode: GroupCodeDto = {code: randCode, user_id: ''};
            let ans = await this.searchGroupByCode(searchCode);
            if (!ans){
                dup = false;
            }
        }
        let foundGroup = await this.findGroupById(data);
        let newGroup: SetGroupDto = foundGroup;
        newGroup.group_code = randCode;
        return await this.groupRepository.save(newGroup);
    }

    async deleteInvitation(data: SearchGroupDto){
        let group = await this.findGroupById(data);
        group.group_code = null;
        return await this.groupRepository.save(group);
    }

    async joinWithInvitation(data: GroupCodeDto){
        let group = await this.searchGroupByCode(data);
        if (!group){
            throw new NotFoundException(`There no groupcode is ${data.code}`);
        }
        let member = await this.findMemberByUserId({user_id: data.user_id});
        member.forEach((g) => {
            if (group.family_id == g.group_id) {
                throw new InternalServerErrorException(`Already Joined`);
            }
        })
        let newMember: CreateMemberDto = {
            user_id: data.user_id,
            group_id: group.family_id,
            is_leader: false
        }
        return await this.memberRepository.save(newMember);
    }

    async exitGroup(data: SearchGroupDto){
        const group = await this.findGroupById(data);
        const member = await this.memberRepository.findOne({
            where:{group_id: group.family_id, user_id: data.user_id}
        });
        if (member.is_leader == true) { throw new ForbiddenException(`leader can't exit group`); }
        return await this.memberRepository.delete(member);
    }
    
    async getGroupScore(data: SearchGroupDto){
        const members = await this.findMemberByGroupId(data);
        if (members.length == 0) {return {score: 0};}
        let totalScore = 0;
        for (let member of members) {
            let score = (await this.findUserScore(member.user_id));
            if (score != null) {
                totalScore += score.health_score;
            }
        }
        return {score: totalScore};
    }

    async setGroupScore(data: SearchGroupDto){
        const newScore = await this.getGroupScore(data);
        const group = await this.findGroupById(data);
        group.score = newScore.score;
        return await this.groupRepository.save(group);
    }

    async enterGroup(data: SearchGroupDto){
        const group = await this.findGroupById(data);
        let member = await this.memberRepository.findOne({where:{group_id: data.search_id, user_id: data.user_id}});
        if (member != null) { throw new ConflictException(`alreay exist`); }
        let memberData: CreateMemberDto = {
            user_id: data.user_id,
            group_id: group.family_id,
            is_leader: false
        }
        return await this.memberRepository.save(memberData);
    }

    async forceLeader(data: SearchGroupDto){
        let member = await this.memberRepository.findOne({where:{group_id: data.search_id, user_id: data.user_id}});
        if (member == null) { throw new NotFoundException(`not found`); }
        member.is_leader = true;
        return await this.memberRepository.save(member);
    }

    async setLeader(data: SetLeaderDto){
        let leader = await this.memberRepository.findOne({where:{group_id: data.group_id, user_id: data.user_id}});
        if (leader.is_leader == false) { throw new UnauthorizedException('You are not leader'); }
        let member = await this.memberRepository.findOne({where:{group_id: data.group_id, user_id: data.target_user_id}});
        if (member == null) { throw new NotFoundException(`There's no member with id ${data.target_user_id}`); }
        leader.is_leader = false;
        member.is_leader = true;
        await this.memberRepository.save(leader);
        return await this.memberRepository.save(member);
    }
}