import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { LocalServiceStrategy } from './guards/local-service.guard';
import { JwtServiceAuthGuard } from './guards/jwt-service.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GoogleGuard } from './guards/google.guard';

@ApiTags('auth API')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @ApiOperation({summary: 'resigst', description: 'make account'})
    @ApiBody({type: CreateUserDto})
    @Post('join')
    async postJoin(@Body() createUserDto: CreateUserDto) {
        await this.authService.checkPassword(createUserDto);
        createUserDto = await this.authService.hashing(createUserDto);
        return await this.authService.postJoin(createUserDto);
    }

    @ApiOperation({summary: 'login', description: 'login'})
    @UseGuards(LocalServiceStrategy)
    @Post('login')
    async postLogin(@Req() req, @Res() res) {
        const token = await this.authService.loginServiceUser(req.user);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Authorization', 'Bearer ' + await token.token);

        const refreshToken = this.authService.generateRefreshToken(req.user);
        res.setHeader('Refresh', 'Bearer ' + await refreshToken);
        res.status(200).json({
            status: 200,
            info: "success",
            token: await token.token
        });
    }

    @Get('googleLogin')
    @UseGuards(GoogleGuard)
    async googleAuthCallback(@Req() req, @Res() res){
        return res.status(200).send();
    }

    @Get('google/callback')
    @UseGuards(GoogleGuard)
    async googleAuth(@Req() req, @Res() res): Promise<void> {
        const token = await this.authService.googleLogin(req, res);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Authorization', 'Bearer ' + token.token);

        res.status(200).json({
            status: 200,
            info: "success",
            token: await token.token
        });
    }
    
    @ApiOperation({summary: 'profile', description: 'get my profile'})
    @UseGuards(JwtServiceAuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        let user = await this.authService.findJwtUser(req);
        return {
            user_id: user.user_id,
            nickname: user.nickname,
            is_man: user.is_man,
            d_day: user.d_day,
        }
    }

    @ApiOperation({summary: 'profile', description: 'get my profile'})
    @UseGuards(JwtServiceAuthGuard)
    @Post('changeProfile')
    async changeProfile(@Body() userDto: UpdateUserDto,@Req() req, @Res() res) {
        let user = await this.authService.findJwtUser(req);
        await this.authService.saveUserData(req, user);
        res.status(200).json({
            status: 200,
            info: "success"
        });
    }

    @ApiOperation({summary: 'refresh token', description: 'generate another refreshToken'})
    @Post('refreshToken')
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res//: Response,
    ) {
        let token: string = req.headers['authorization'].replace('Bearer ', '');
        let refreshTokenDto: RefreshTokenDto = {refresh_token: token};

        const newAccessToken = (await this.authService.refresh(refreshTokenDto)).acessToken;
        res.setHeader('Authorization', 'Bearer ' + newAccessToken);
        res.cookie('access_token', newAccessToken, { httpOnly: true });
        res.send({newAccessToken});
    }

    @ApiOperation({summary: 'profile', description: 'get my profile'})
    @UseGuards(JwtServiceAuthGuard)
    @Delete('secession')
    async secession(@Req() req: Request,@Res() res){
        let user = await this.authService.findJwtUser(req);
        await this.authService.deleteUser(user);

        res.status(200).json({
            status: 200,
            info: "success",
            deletedUser: user,
        });
    }
}
