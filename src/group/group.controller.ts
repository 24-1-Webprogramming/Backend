import { Controller, Get, Post, Delete, Body, Req, Res, UseGuards, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupDto, GroupCodeDto, SearchGroupDto } from './dto/group.dto';
import { JwtServiceAuthGuard } from 'src/auth/guards/jwt-service.guard';

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
    @UseGuards(JwtServiceAuthGuard)
    @Post('makeGroup')
    async makeGroup(@Body() body: CreateGroupDto, @Req() req, @Res() res){
        try {
            let newGroup = await this.groupService.makeGroup(body.name, req);
            return res.status(HttpStatus.CREATED).json(newGroup);
        } catch (error) {
            if (error instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
              }
              return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
        
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 검색 (id)', description: '해당 그룹 코드를 가진 그룹을 찾는다'})
    @ApiBody({type: String})
    @ApiResponse({ status: 200, description: 'found'})
    @UseGuards(JwtServiceAuthGuard)
    @Get('checkGroupByCode')
    async checkGroupByCode(@Body() body: SearchGroupDto, @Res() res){
        let foundGroup = await this.groupService.findGroupById(body);
        res.status(HttpStatus.OK).json(foundGroup);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 검색 (user_id)', description: '해당 유저를 포함하는 그룹 연결을 찾는다'})
    @ApiResponse({ status: 200, description: 'found'})
    @UseGuards(JwtServiceAuthGuard)
    @Get('checkGroupByUserId')
    async checkGroupByUserId(@Req() req: Request, @Res() res){
        let foundGroupList = await this.groupService.findGroupByUserId(req);
        res.status(HttpStatus.OK).json(foundGroupList);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 가입', description: 'group id와 user id를 포함하는 group_members record를 생성한다'})
    @ApiBody({type: CreateGroupDto})
    @ApiResponse({ status: 201, description: 'The group members record has been successfully created.'})
    @UseGuards(JwtServiceAuthGuard)
    @Post('enterGroup')
    async enterGroup(){

    }

    @ApiBearerAuth()
    
    @UseGuards(JwtServiceAuthGuard)
    @Post('setLeader')
    async setLeader(){

    }

    @ApiBearerAuth()
    @UseGuards(JwtServiceAuthGuard)
    @Post('secLeader')
    async secLeader(){
        
    }

    @ApiBearerAuth()
    @UseGuards(JwtServiceAuthGuard)
    @Delete('exitGroup')
    async exitGroup(){
        
    }

    @ApiBearerAuth()
    @UseGuards(JwtServiceAuthGuard)
    @Get('checkInvitation')
    async checkInvitation(){

    }

    @ApiBearerAuth()
    @ApiOperation({summary: '그룹 초대코드 생성', description: '그룹 초대 코드를 생성한다, 기존의 초대 코드가 있다면 초기화한다. '})
    @ApiBody({type: SearchGroupDto})
    @ApiResponse({ status: 200, description: 'Generated Code'})
    @UseGuards(JwtServiceAuthGuard)
    @Post('makeInvitation')
    async makeInvitation(@Body() data: SearchGroupDto, @Res() res){
        let ans = await this.groupService.makeInvitation(data);
        res.status(HttpStatus.OK).json({ans});
    }

    @ApiBearerAuth()
    @UseGuards(JwtServiceAuthGuard)
    @Delete('deleteInvitation')
    async deleteInvitation(){

    }

    @Post('updateGroupScore')
    async undateGroupScore(){
        
    }
}
