import { Body, Controller, Delete, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserDto, acessTokenDto, tokensDto } from './dto/user.dto';
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

    
    @Post('join')
    @ApiOperation({summary: '회원가입 api', description: 'User 정보를 생성한다. '})
    @ApiBody({type: CreateUserDto})
    @ApiResponse({ 
        status: 201, 
        description: 'The User record has been successfully created.',
        type: UserDto
    })
    async postJoin(@Body() createUserDto: CreateUserDto, @Res() res) {
        await this.authService.checkPassword(createUserDto);
        createUserDto = await this.authService.hashing(createUserDto);
        let user = await this.authService.postJoin(createUserDto);
        return res.status(HttpStatus.CREATED).json(user);
    }

    @UseGuards(LocalServiceStrategy)
    @Post('login')
    @ApiOperation({summary: '로그인', description: 'User 정보를 대조해 토큰을 발급한다'})
    @ApiBody({type: LoginUserDto})
    @ApiResponse({ 
        status: 201, 
        description: 'success',
        type: tokensDto
    })
    async postLogin(@Req() req, @Res() res) {
        const token = await this.authService.loginServiceUser(req.user);
        //res.setHeader('Content-Type', 'application/json; charset=utf-8');
        //res.setHeader('Authorization', 'Bearer ' + await token.token);

        const refreshToken = await this.authService.generateRefreshToken(req.user);
        //res.setHeader('Refresh', 'Bearer ' + await refreshToken);
        res.status(HttpStatus.OK).json({
            info: "success",
            token: await token.token,
            refreshToken: await refreshToken
        });
    }

    @ApiOperation({summary: '구글 로그인', description: '구글 계정에서 고유 식별 번호를 요청받는다 이후 google/callback으로 리다이렉트 한다'})
    @ApiResponse({
        type: tokensDto
    })
    @Get('googleLogin')
    @UseGuards(GoogleGuard)
    async googleAuthCallback(@Req() req, @Res() res){
        return res.status(HttpStatus.OK).send();
    }

    @ApiOperation({summary: '구글 로그인 리다이렉트', description: '(이쪽으로 직접 요청하지 마세요) 회원 정보가 있을 경우 로그인, 없을 경우 회원가입 후 로그인 한다. '})
    @Get('google/callback')
    @UseGuards(GoogleGuard)
    async googleAuth(@Req() req, @Res() res): Promise<void> {
        const data = await this.authService.googleLogin(req);
        //res.setHeader('Content-Type', 'application/json; charset=utf-8');
        //res.setHeader('Authorization', 'Bearer ' + data.token);
        
        res.status(HttpStatus.OK).json({
            info: "success",
            token: data.token,
            refreshToken: data.refresh
        });
    }
    
    @ApiBearerAuth()
    @ApiOperation({summary: '프로필', description: 'get my profile'})
    @ApiResponse({ 
        status: 302, 
        description: '사용자의 프로필을 반환',
        type: UserDto
    })
    @UseGuards(JwtServiceAuthGuard)
    @Get('profile')
    async getProfile(@Req() req, @Res() res) {
        let user = await this.authService.findJwtUser(req);
        res.status(HttpStatus.FOUND).json({
            user_id: user.user_id,
            nickname: user.nickname,
            is_man: user.is_man,
            d_day: user.d_day,
        });
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '프로필 수정', description: '프로필 정보, User record의 정보를 수정한다'})
    @UseGuards(JwtServiceAuthGuard)
    @ApiResponse({ 
        status: 200, 
        description: 'success',
        type: tokensDto
    })
    @Post('changeProfile')
    async changeProfile(@Body() userDto: UpdateUserDto,@Req() req, @Res() res) {
        let user = await this.authService.findJwtUser(req);
        let ans = await this.authService.saveUserData(req, user);
        res.status(HttpStatus.OK).json(ans);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '토큰 refresh', description: 'refresh token을 bearer헤더로 두면 새로운 jwt token을 발급한다'})
    @ApiResponse({ 
        status: 200, 
        description: 'success',
        type: acessTokenDto
    })
    @Post('refreshToken')
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res//: Response,
    ) {
        let token: string = req.headers['authorization'].replace('Bearer ', '');
        let refreshTokenDto: RefreshTokenDto = {refresh_token: token};

        const newAccessToken = (await this.authService.refresh(refreshTokenDto)).acessToken;
        //res.setHeader('Authorization', 'Bearer ' + newAccessToken);
        //res.cookie('access_token', newAccessToken, { httpOnly: true });
        res.send({newAccessToken});
        res.status(HttpStatus.OK);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'secession', description: 'delete user record'})
    @UseGuards(JwtServiceAuthGuard)
    @ApiResponse({ 
        status: 200, 
        description: 'success',
        type: UserDto
    })
    @Delete('secession')
    async secession(@Req() req: Request,@Res() res){
        let user = await this.authService.findJwtUser(req);
        await this.authService.deleteUser(user);

        res.status(HttpStatus.OK).json(user);
    }   
}
