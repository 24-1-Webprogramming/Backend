import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ){}

    getAccessToken({user}): string {
        return this.jwtService.sign(
            {
                id: user.id,
                sub: user.name,
            },
            {
                secret: "secret",//process.env.ACCESS_TOKEN_SECRET_KEY,
                expiresIn: '10m',
            }
        )
    }

    setRefreshToken({user, res}) {
        const refreshToken = this.jwtService.sign(
            {
                id: user.id,
                sub: user.name,
            },
            {
                secret: "secret",//process.env.REFRESH_TOKEN_SECRET_KEY,
                expiresIn: '2w',
            }
        );
        //쿠키 보안 옵션, CORS
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
        return;
    }
}
