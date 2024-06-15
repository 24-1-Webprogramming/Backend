import { Body, Controller, Delete, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OnboardService } from './onboard.service';
import { JwtServiceAuthGuard } from 'src/auth/guards/jwt-service.guard';
import { onboardDto } from './dto/onboard.dto';

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
    @UseGuards(JwtServiceAuthGuard)
    async setOnboard(@Body() body, @Req() req, @Res() res) {
        let onboard = await this.onboardService.findOnboard(req);
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
    @UseGuards(JwtServiceAuthGuard)
    async checkOnboard(@Req() req, @Res() res){
        let onboard = await this.onboardService.findOnboard(req);
        res.status(HttpStatus.OK).json(onboard)
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'onboard 삭제', description: '사용자의 onboard를 삭제한다. '})
    @ApiResponse({ status: 200, description: 'success - 삭제된 온보딩', type: onboardDto})
    @ApiResponse({status: 404, description: 'failed - 온보딩 없음'})
    @Delete("removeOnboard")
    @UseGuards(JwtServiceAuthGuard)
    async deleteOnboard(@Req() req, @Res() res){
        let onboard = await this.onboardService.findOnboard(req);
        if (onboard == null) {
            return res.status(HttpStatus.NOT_FOUND).json({});
        }
        let del = await this.onboardService.deleteData(onboard);
        res.status(HttpStatus.OK).json(del)
    }
}
