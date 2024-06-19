import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, findUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Payload } from './payload/payload.interface';
import { OAuth2Client } from 'google-auth-library';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    private client: OAuth2Client;

    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        private readonly configService: ConfigService,
        private jwtService: JwtService,
    ) {
        this.client = new OAuth2Client('241488948308-7719rl1iltknq0c1mnea32tbhg463ac2.apps.googleusercontent.com');
    }

    async postJoin(createUserDto: CreateUserDto) {
        return await this.userRepository.save(createUserDto);
    }

    async checkPassword(createUserDto: CreateUserDto){
        let min_password = 8;
        if (createUserDto.password.length < min_password){
            console.log("short password");
            return false;
        }
        let hasUppercase = /[A-Z]/.test(createUserDto.password);
        let hasLowercase = /[a-z]/.test(createUserDto.password);
        let hasNumber = /[0-9]/.test(createUserDto.password);
        let hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(createUserDto.password);
        let characterTypes = [hasUppercase, hasLowercase, hasNumber, hasSpecial];
        let numberOfTypes = characterTypes.filter(Boolean).length;
        if (numberOfTypes < 3) {
            return false;
        }
        return true;
    }
    
    async hashing(createUserDto: CreateUserDto){
        createUserDto.password = await bcrypt.hash(createUserDto.password, 11);
        return createUserDto;
    }

    async validateServiceUser(id: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({where:{user_id: id}});
        if (!user) {
            throw new ForbiddenException(`there's no user with id ${id}`);
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new ForbiddenException('password is not matched');
        }
        return user;
    }
    async loginServiceUser(user: Users) {
        const payload = {
            type: 'access',
            id: user.user_id,
        }

        return {
            token: this.jwtService.signAsync(payload),
        }
    }
    async generateRefreshToken(user: Users) {
        const payload = {
            type: 'refresh',
            id: user.user_id,
        }
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('SECRET_KEY'),
            expiresIn: '2w',
        });
    }

    async refresh(refreshTokenDto: RefreshTokenDto): Promise<{ acessToken: string }> {
        const { refresh_token } = refreshTokenDto;
        const decodeRefreshToken = this.jwtService.verify(refresh_token, {secret: this.configService.get('SECRET_KEY')}) as Payload;
        const user_id = decodeRefreshToken.user_id;
        const user = await this.userRepository.findOne({where:{user_id: user_id}});
        if (!user) {
            throw new UnauthorizedException();
        }
        const accessToken = await this.generateRefreshToken(user);
        return {acessToken: accessToken};
    }

    async googleLogin(req){
        let user = await this.userRepository.findOne({where: {'user_id': await req.user.providerId}});
        console.log(user);
        if (!user) {
            (req.session as any).redirectUrl = "http://localhost:3000/onboarding";
            console.log(req.query.redirectUrl);
            const input = {
                user_id: await req.user.providerId,
                nickname: null,
                is_man: null,
                d_day: null,
                password: null,
            } as CreateUserDto;
            user = await this.postJoin(input);
        }
        let data = {
            token: await (await this.loginServiceUser(user)).token,
            refresh: await this.generateRefreshToken(user)
        }
        return data;
    }

    async findJwtUser(req){
        let token: string = req.headers['authorization'].replace('Bearer ', '');
        const decodeToken = this.jwtService.verify(token, {secret: this.configService.get('SECRET_KEY')})
        return await this.userRepository.findOne({where:{user_id: decodeToken.user_id}});
    }

    async deleteUser(user: Users){
        let ans = await this.userRepository.delete({user_id: user.user_id});
    }

    async saveUserData(data: UpdateUserDto, user: Users){
        let userData = user;
        userData.nickname = data.nickname;
        userData.is_man = data.is_man;
        userData.d_day = data.d_day;
        return await this.userRepository.save(userData);
    }
    
    async verifyToken(token: string) {
        try {
          const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: '241488948308-7719rl1iltknq0c1mnea32tbhg463ac2.apps.googleusercontent.com',
          });
          const payload = ticket.getPayload();

          let isExist = true;
          let user = await this.userRepository.findOne({where: {user_id: payload.email}});
          if (!user){
            isExist = false;
            const input = {
                user_id: payload.email,
                nickname: null,
                is_man: null,
                d_day: null,
                password: null,
            } as CreateUserDto;
            await this.postJoin(input);
          }


          return {
            success: true,
            isExist: isExist,
          };
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }

    async findUser(data: findUserDto){
        console.log(data);
        let user = await this.userRepository.findOne({where:{user_id: data.user_id}});
        console.log(user);
        return user;
    }
}


//맞는가, 있냐 없냐
// googleVerify