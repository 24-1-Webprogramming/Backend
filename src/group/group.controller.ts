import { Controller, Get, Post, Delete, Body, Req, Res, UseGuards, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupDto, GroupCodeDto, GroupDto, SearchGroupDto } from './dto/group.dto';
import { JwtServiceAuthGuard } from 'src/auth/guards/jwt-service.guard';
import { MemberDto, SetLeaderDto } from './dto/member.dto';
import { group } from 'console';
import { JwtStrategy } from 'src/auth/strategies/newStrategy.strategy';
import { UserIdDto } from 'src/diet/dto/find-diet.dto';

@ApiTags('group API')
@Controller('group')
export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) {}
    
    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 생성', description: '그룹을 생성한다 (family record 생성)'})
    @ApiBody({type: CreateGroupDto})
    @ApiResponse({ status: 201, description: 'The Group record has been successfully created.'})
    @UseGuards(JwtStrategy)
    @ApiResponse({ 
        status: 201,
        description: 'success',
        type: GroupDto
    })
    @ApiResponse({ 
        status: 400,
        description: 'BAD_REQUEST'
    })
    @ApiResponse({ 
        status: 500,
        description: 'INTERNAL_SERVER_ERROR'
    })
    @Post('makeGroup')
    async makeGroup(@Body() body: CreateGroupDto, @Res() res){
        try {
            let newGroup = await this.groupService.makeGroup(body);
            return res.status(HttpStatus.CREATED).json(newGroup);
        } catch (error) {
            if (error instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 검색 (group id)', description: '해당 그룹 코드를 가진 그룹을 찾는다'})
    @ApiBody({type: String})
    @ApiResponse({ status: 200, description: 'found', type: GroupDto})
    @UseGuards(JwtStrategy)
    @Post('checkGroupByCode')
    async checkGroupByCode(@Body() body: SearchGroupDto, @Res() res){
        let foundGroup = await this.groupService.findGroupById(body);
        res.status(HttpStatus.OK).json(foundGroup);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 검색 (user_id)', description: '해당 유저를 포함하는 그룹 연결을 찾는다'})
    @ApiResponse({ status: 200, description: 'found *List로 반환합니다*', type: GroupDto})
    @UseGuards(JwtStrategy)
    @Post('checkGroupByUserId')
    async checkGroupByUserId(@Body() body: UserIdDto, @Res() res){
        let memberList = await this.groupService.findMemberByUserId(body);
        res.status(HttpStatus.OK).json(memberList);
    }
    
    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 가입', description: 'group id와 user id를 포함하는 group_members record를 생성한다'})
    @ApiBody({type: CreateGroupDto})
    @ApiResponse({ status: 201, description: 'success', type: GroupDto})
    @ApiResponse({ status: 409, description: 'fail'})
    @UseGuards(JwtStrategy)
    @Post('enterGroup')
    async enterGroup(@Body() body: SearchGroupDto, @Res() res){
        try {
            let ans = await this.groupService.enterGroup(body);
            res.status(HttpStatus.CREATED).json(ans);
        } catch (error) {
            res.status(HttpStatus.CONFLICT).json(error);
        }
    }
    
    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 멤버 조회', description: '그룹에 포함되어 있는 사용자들의 리스트를 반환한다. '})
    @ApiBody({type: CreateGroupDto})
    @ApiResponse({ status: 302, description: 'success *List로 반환합니다*', type: GroupDto})
    @UseGuards(JwtStrategy)
    @Post('ckeckGroup')
    async ckeckGroup(@Body() body: SearchGroupDto, @Res() res){
        let members = await this.groupService.findGroupMember(body);
        res.status(HttpStatus.FOUND).json(members);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 삭제', description: '그룹과 해당 그룹이 포함된 멤버의 레코드를 모두 삭제합니다. '})
    @ApiBody({type: CreateGroupDto})
    @ApiResponse({ status: 200, description: 'success (지워진 그룹 반환)', type: group})
    @ApiResponse({ status: 401, description: 'fail'})
    @UseGuards(JwtStrategy)
    @Delete('deleteGroup')
    async deleteGroup(@Body() body: SearchGroupDto, @Res() res){
        try {
            let ans = await this.groupService.deleteGroup(body);
            res.status(HttpStatus.OK).json({message: "succesfully deleted", ans});
        } catch (error) {
            res.status(HttpStatus.UNAUTHORIZED).json(error);
        }
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '리더 강요 (이거 쓰지 마세요, 테스트할 때만 쓰세요!!)', description: '리더를 강제합니ㄷ '})
    @ApiBody({type: SearchGroupDto})
    @ApiResponse({ status: 200, description: 'success', type: MemberDto})
    @UseGuards(JwtStrategy)
    @Post('forceLeader')
    async forceLeader(@Body() body: SearchGroupDto, @Res() res){
        let ans = await this.groupService.forceLeader(body);
        res.status(HttpStatus.OK).json(ans);
    }

    @ApiBearerAuth()
    @UseGuards(JwtStrategy)
    @ApiOperation({summary: '리더 설정', description: '리더가 다른 멤버를 리더로 설정합니다. 자신은 리더를 박탈당합니다'})
    @ApiBody({type: SearchGroupDto})
    @ApiResponse({ status: 200, description: 'success (지정한 사람)', type: MemberDto})
    @ApiResponse({ status: 401, description: 'fail - 리더가 아님'})
    @ApiResponse({ status: 404, description: 'fail - 멤버가 유효하지 않음'})
    @Post('setLeader')
    async setLeader(@Body() body: SetLeaderDto, @Res() res){
        try {
            let ans = await this.groupService.setLeader(body);
            res.status(HttpStatus.ACCEPTED).json(ans);
        } catch (error) {
            return res.json(error);
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtStrategy)
    @ApiOperation({summary: '그룹 탈퇴', description: '그룹을 탈퇴합니다. 리더는 탈퇴가 불가능합니다'})
    @ApiBody({type: SearchGroupDto})
    @ApiResponse({ status: 200, description: 'success', type: MemberDto})
    @ApiResponse({ status: 403, description: 'fail - leader일 경우'})
    @Delete('exitGroup')
    async exitGroup(@Body() body: SearchGroupDto, @Res() res){
        try {
            let ans = await this.groupService.exitGroup(body);
            res.status(HttpStatus.OK).json(ans);
        } catch (error) {
            res.status(HttpStatus.FORBIDDEN).json(error);
        }
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 가입', description: '사용자를 그룹에 가입시킨다, 초대코드와 대조 후 추가한다. '})
    @ApiBody({type: GroupCodeDto})
    @ApiResponse({ status: 201, description: 'success', type: MemberDto})
    @ApiResponse({ status: 404, description: 'fail - 그룹이 존재하지 않음'})
    @ApiResponse({ status: 500, description: 'fail - 이미 가입됨'})
    @UseGuards(JwtStrategy)
    @Post('joinWithInvitation')
    async checkInvitation(@Body() body: GroupCodeDto, @Req() req: Request, @Res() res){
        try{
            let ans = await this.groupService.joinWithInvitation(body);
            return res.status(HttpStatus.CREATED).json({ans});
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }

    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 초대코드 생성', description: '그룹 초대 코드를 생성한다, 기존의 초대 코드가 있다면 초기화한다. '})
    @ApiBody({type: SearchGroupDto})
    @ApiResponse({ 
        status: 200, 
        description: 'Generated Code',
        type: GroupDto
    })
    @UseGuards(JwtStrategy)
    @Post('makeInvitation')
    async makeInvitation(@Body() data: SearchGroupDto, @Res() res){
        let ans = await this.groupService.makeInvitation(data);
        res.status(HttpStatus.OK).json({ans});
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 초대코드 삭제', description: '그룹 초대 코드를 삭제합니다 (해당 속성을 null로 만듭니다) '})
    @ApiBody({type: SearchGroupDto})
    @UseGuards(JwtStrategy)
    @ApiResponse({ status: 200, description: 'success', type: GroupDto})
    @Delete('deleteInvitation')
    async deleteInvitation(@Body() data: SearchGroupDto, @Res() res){
        let ans = await this.groupService.deleteInvitation(data);
        res.status(HttpStatus.OK).json({ans});
    }

    @Post('getGroupScore')
    @ApiBearerAuth()
    @ApiOperation({summary: '그룹원들 점수 합산', description: '그룹원들의 점수를 합산해서 반환합니다. (팀점수를 반환합니다)'})
    @ApiBody({type: SearchGroupDto})
    @ApiResponse({ status: 302, description: 'success'})
    async getGroupScore(@Body() body: SearchGroupDto, @Res() res){
        let ans = await this.groupService.getGroupScore(body);
        res.status(HttpStatus.FOUND).json(ans);
    }

    @Post('setGroupScore')
    @ApiBearerAuth()
    @ApiOperation({summary: '그룹원들 점수 설정', description: '그룹원들의 점수를 합산해서 저장합니다. (팀점수를 저장합니다)'})
    @ApiBody({type: SearchGroupDto})
    @ApiResponse({ status: 202, description: 'success'})
    async setGroupScore(@Body() body: SearchGroupDto, @Res() res){
        let ans = await this.groupService.setGroupScore(body);
        res.status(HttpStatus.ACCEPTED).json(ans);
    }
}
