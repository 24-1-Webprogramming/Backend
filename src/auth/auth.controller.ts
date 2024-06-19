import { Body, Controller, Delete, Get, HttpStatus, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserDto, acessTokenDto, findUserDto, tokensDto } from './dto/user.dto';
import { LocalServiceStrategy } from './guards/local-service.guard';
import { JwtServiceAuthGuard } from './guards/jwt-service.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GoogleGuard } from './guards/google.guard';
import axios from 'axios';
import { JwtStrategy } from './strategies/newStrategy.strategy';

@ApiTags('auth API') // 컨트롤러에 태그 추가
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('join')
    @ApiOperation({summary: '회원가입 api', description: 'User 정보를 생성한다.'})
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
        const refreshToken = await this.authService.generateRefreshToken(req.user);
        res.status(HttpStatus.OK).json({
            info: "success",
            token: await token.token,
            refreshToken: refreshToken
        });
    }

    @ApiOperation({summary: '(legacy) 구글 로그인', description: '구글 계정에서 고유 식별 번호를 요청받는다 이후 google/callback으로 리디렉트 한다 -> 결과적으로 첫 로그인이면 http://localhost:3000/onboard로, 아니면 지정한 곳으로 리디렉트한다.'})
    @ApiResponse({
        type: tokensDto
    })
    @ApiQuery({ name: 'redirectUrl', required: true, description: 'redirect할 주소' })
    @Get('googleLogin')
    @UseGuards(GoogleGuard)
    async googleAuthCallback(@Res() res){
        return res.status(HttpStatus.OK).send();
    }

    @ApiOperation({summary: '(legacy) 구글 로그인 리다이렉트', description: '(이쪽으로 직접 요청하지 마세요) 회원 정보가 있을 경우 로그인, 없을 경우 회원가입 후 로그인 한다.'})
    @Get('google/callback')
    @UseGuards(GoogleGuard)
    async googleAuth(@Req() req, @Res() res): Promise<void> {
        const data = await this.authService.googleLogin(req);
        const redirectUrl = req.session.redirectUrl || 'http://localhost:3000/onboarding';
        delete req.session.redirectUrl;
        
        await axios.post(redirectUrl, {
            token: data.token,
            refresh: data.refresh
        });

        res.redirect(redirectUrl);
    }
    
    @ApiBearerAuth()
    @ApiOperation({summary: '프로필', description: 'get my profile'})
    @ApiResponse({
        status: 302, 
        description: '사용자의 프로필을 반환',
        type: UserDto
    })
    @UseGuards(JwtStrategy)
    @Post('profile')
    async getProfile(@Req() req, @Body() body: findUserDto, @Res() res) {
        let user = await this.authService.findUser(body);
        if (!user) {
            return res.status(404).json({status:"not found"});
        }
        return res.status(HttpStatus.FOUND).json(user);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: '프로필 수정', description: '프로필 정보, User record의 정보를 수정한다'})
    @UseGuards(JwtStrategy)
    @ApiBody({type: UpdateUserDto})
    @ApiResponse({ 
        status: 200, 
        description: 'success',
        type: tokensDto
    })
    @Post('changeProfile')
    async changeProfile(@Body() userDto: UpdateUserDto,@Req() req, @Res() res) {
        let user = await this.authService.findUser({user_id: userDto.user_id});
        let ans = await this.authService.saveUserData(userDto, user);
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
        @Res({ passthrough: true }) res
    ) {
        let token: string = req.headers['authorization'].replace('Bearer ', '');
        let refreshTokenDto: RefreshTokenDto = {refresh_token: token};

        const newAccessToken = (await this.authService.refresh(refreshTokenDto)).acessToken;
        res.send({newAccessToken});
        res.status(HttpStatus.OK);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'secession', description: 'delete user record'})
    @UseGuards(JwtStrategy)
    @ApiResponse({ 
        status: 200, 
        description: 'success',
        type: UserDto
    })
    @Delete('secession')
    async secession(@Body() body: findUserDto, @Res() res){
        let user = await this.authService.findUser(body);
        await this.authService.deleteUser(user);
        res.status(HttpStatus.OK).json(user);
    }

    @Post('google')
    @ApiOperation({summary: '구글 토큰 검증', description: 'Google OAuth 토큰을 검증한다.'})
    @ApiBody({ type: UserDto})
    @ApiResponse({ 
        status: 200, 
        description: 'Google token 검증 성공',
        type: UserDto
    })
    async verifyGoogleToken(@Body('credential') token: string) {
        const result = await this.authService.verifyToken(token);
        return result;
    }
}
