import { GroupService } from './group.service';
import { CreateGroupDto, GroupCodeDto, SearchGroupDto } from './dto/group.dto';
import { SetLeaderDto } from './dto/member.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    makeGroup(body: CreateGroupDto, req: any, res: any): Promise<any>;
    checkGroupByCode(body: SearchGroupDto, res: any): Promise<void>;
    checkGroupByUserId(req: Request, res: any): Promise<void>;
    enterGroup(body: SearchGroupDto, req: any, res: any): Promise<void>;
    ckeckGroup(body: SearchGroupDto, res: any): Promise<void>;
    deleteGroup(body: SearchGroupDto, req: any, res: any): Promise<void>;
    forceLeader(body: SearchGroupDto, req: Request, res: any): Promise<void>;
    setLeader(body: SetLeaderDto, req: Request, res: any): Promise<any>;
    exitGroup(body: SearchGroupDto, req: Request, res: any): Promise<void>;
    checkInvitation(body: GroupCodeDto, req: Request, res: any): Promise<any>;
    makeInvitation(data: SearchGroupDto, res: any): Promise<void>;
    deleteInvitation(data: SearchGroupDto, res: any): Promise<void>;
    getGroupScore(body: SearchGroupDto, res: any): Promise<void>;
    setGroupScore(body: SearchGroupDto, res: any): Promise<void>;
}
