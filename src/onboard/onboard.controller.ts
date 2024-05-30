import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { OnboardService } from './onboard.service';
import { JwtServiceAuthGuard } from 'src/auth/guards/jwt-service.guard';
import { onboardDto } from './dto/onboard.dto';

@Controller('onboard')
export class OnboardController {
    constructor(
        private onboardService: OnboardService
    ) {}
    
    @ApiOperation({summary: 'set onboard condition', description: 'if it exist? change it, if it isn\'t? create it'})
    @Post("setOnboard")
    @ApiBody({type: onboardDto})
    @UseGuards(JwtServiceAuthGuard)
    async setOnboard(@Body() body, @Req() req, @Res() res){
        let onboard = await this.onboardService.find(req);
        await this.onboardService.saveData(body);
        let info: string = (onboard = null) ? "successfully created" : "successfully changed";
        res.status(200).json({
            status: 200,
            info: info
        });
    }

    @Get("checkOnboard")
    @UseGuards(JwtServiceAuthGuard)
    async checkOnboard(@Req() req, @Res() res){
        let onboard = await this.onboardService.find(req);
        res.status(200).json({
            status: 200,
            value: onboard
        })
    }

    @Delete("removeOnboard")
    @UseGuards(JwtServiceAuthGuard)
    async deleteOnboard(@Req() req){
        let onboard = await this.onboardService.find(req);
        return await this.onboardService.deleteData(onboard);
    }
}
