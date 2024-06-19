import { Body, Controller, Delete, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OnboardService } from './onboard.service';
import { JwtServiceAuthGuard } from 'src/auth/guards/jwt-service.guard';
import { onboardDto } from './dto/onboard.dto';
import { JwtStrategy } from 'src/auth/strategies/newStrategy.strategy';
import { UserIdDto } from 'src/diet/dto/find-diet.dto';

@ApiTags('onboard api')
@Controller('onboard')
export class OnboardController {
    constructor(
        private onboardService: OnboardService
    ) {}
    
    @ApiBearerAuth()
    @ApiOperation({summary: 'onboard 설정', description: '사용자의 onboard를 설정한다. 없으면 생성하고, 있으면 덮어쓴다. '})
    @Post("setOnboard")
    @ApiResponse({ status: 201, description: 'success'})
    @ApiBody({type: onboardDto})
    @UseGuards(JwtStrategy)
    async setOnboard(@Body() body: onboardDto, @Res() res) {
        let onboard = await this.onboardService.findOnboard({user_id: body.user_id});
        await this.onboardService.saveData(body);
        let info: string = (onboard = null) ? "successfully created" : "successfully changed";
        res.status(HttpStatus.CREATED).json({
            info: info
        });
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'onboard 조회', description: '사용자의 onboard를 조회한다. '})
    @ApiResponse({ status: 200, description: 'success', type: onboardDto})
    @Post("checkOnboard")
    @UseGuards(JwtStrategy)
    async checkOnboard(@Body() body: UserIdDto, @Res() res){
        let onboard = await this.onboardService.findOnboard(body);
        res.status(HttpStatus.OK).json(onboard)
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'onboard 삭제', description: '사용자의 onboard를 삭제한다. '})
    @ApiResponse({ status: 200, description: 'success - 삭제된 온보딩', type: onboardDto})
    @ApiResponse({status: 404, description: 'failed - 온보딩 없음'})
    @Delete("removeOnboard")
    @UseGuards(JwtStrategy)
    async deleteOnboard(@Body() body: UserIdDto, @Res() res){
        let onboard = await this.onboardService.findOnboard(body);
        if (onboard == null) {
            return res.status(HttpStatus.NOT_FOUND).json({});
        }
        let del = await this.onboardService.deleteData(onboard);
        res.status(HttpStatus.OK).json(del)
    }
}
