import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { GroupMember } from 'src/entities/group_members.entity';
import { Group } from 'src/entities/groups.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/member.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GroupCodeDto, SearchGroupDto, SetGroupDto } from './dto/group.dto';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(GroupMember)
        private readonly memberRepository: Repository<GroupMember>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}
    
    generateRandomCode(length: number){
        return randomBytes(length/2).toString('hex');
    }

    async findJwtUser(req){
        let token: string = req.headers['authorization'].replace('Bearer ', '');
        const decodeToken = this.jwtService.verify(token,  {secret: this.configService.get('SECRET_KEY')})
        return await this.userRepository.findOne({where:{user_id: decodeToken.user_id}});
    }

    async makeGroup(name: string, req: Request){
        let legacy = await this.groupRepository.findOne({where: {name: name}});
        if (legacy){
            throw new BadRequestException('group name is already exist');
        }
        const newGroup = this.groupRepository.create({ name });
        let createdGroup = await this.groupRepository.save(newGroup);

        //사용자(멤버) 등록
        let memberData: CreateMemberDto = {
            user_id: (await this.findJwtUser(req)).user_id,
            group_id: createdGroup.family_id,
            is_leader: true
        }
        const newMember = await this.memberRepository.save(memberData);
        
        return createdGroup;
    }

    async findGroupById(code: SearchGroupDto){
        return await this.groupRepository.findOne({where:{family_id: code.search_id}});
    }

    async findGroupByUserId(req: Request){
        let user = await this.findJwtUser(req);
        return await this.memberRepository.find({where:{user_id:user.user_id}});
    }

    async searchGroupByCode(code: GroupCodeDto){
        return await this.groupRepository.findOne({where:{group_code: code.code}});
    }

    async makeInvitation(data: SearchGroupDto){
        let dup: Boolean = true;
        let randCode = ""
        while(dup){
            randCode = await this.generateRandomCode(16);
            console.log(randCode);
            let searchCode: GroupCodeDto = {code: randCode};
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
}
