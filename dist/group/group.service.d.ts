import { GroupMember } from 'src/entities/group_members.entity';
import { Group } from 'src/entities/groups.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto, SetLeaderDto } from './dto/member.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GroupCodeDto, SearchGroupDto, SetGroupDto } from './dto/group.dto';
import { Stat } from 'src/entities/user_stats.entity';
export declare class GroupService {
    private readonly userRepository;
    private readonly groupRepository;
    private readonly memberRepository;
    private readonly statRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(userRepository: Repository<Users>, groupRepository: Repository<Group>, memberRepository: Repository<GroupMember>, statRepository: Repository<Stat>, jwtService: JwtService, configService: ConfigService);
    generateRandomCode(length: number): string;
    findJwtUser(req: any): Promise<Users>;
    findUserScore(user_id: string): Promise<Stat>;
    makeGroup(name: string, req: Request): Promise<Group>;
    findGroupMember(data: SearchGroupDto): Promise<GroupMember[]>;
    deleteGroup(data: SearchGroupDto, req: Request): Promise<import("typeorm").DeleteResult>;
    findGroupById(code: SearchGroupDto): Promise<Group>;
    findMemberByUserId(req: Request): Promise<GroupMember[]>;
    findMemberByGroupId(data: SearchGroupDto): Promise<GroupMember[]>;
    searchGroupByCode(code: GroupCodeDto): Promise<Group>;
    makeInvitation(data: SearchGroupDto): Promise<SetGroupDto & Group>;
    deleteInvitation(data: SearchGroupDto): Promise<Group>;
    joinWithInvitation(data: GroupCodeDto, req: Request): Promise<CreateMemberDto & GroupMember>;
    exitGroup(data: SearchGroupDto, req: Request): Promise<import("typeorm").DeleteResult>;
    getGroupScore(data: SearchGroupDto): Promise<{
        score: number;
    }>;
    setGroupScore(data: SearchGroupDto): Promise<Group>;
    enterGroup(data: SearchGroupDto, req: Request): Promise<CreateMemberDto & GroupMember>;
    forceLeader(data: SearchGroupDto, req: Request): Promise<GroupMember>;
    setLeader(data: SetLeaderDto, req: Request): Promise<GroupMember>;
}
