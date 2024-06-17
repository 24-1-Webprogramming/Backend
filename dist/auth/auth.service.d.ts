import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly configService;
    private jwtService;
    constructor(userRepository: Repository<Users>, configService: ConfigService, jwtService: JwtService);
    postJoin(createUserDto: CreateUserDto): Promise<CreateUserDto & Users>;
    checkPassword(createUserDto: CreateUserDto): Promise<boolean>;
    hashing(createUserDto: CreateUserDto): Promise<CreateUserDto>;
    validateServiceUser(id: string, password: string): Promise<any>;
    loginServiceUser(user: Users): Promise<{
        token: Promise<string>;
    }>;
    generateRefreshToken(user: Users): Promise<string>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        acessToken: string;
    }>;
    googleLogin(req: any): Promise<{
        token: string;
        refresh: string;
    }>;
    findJwtUser(req: any): Promise<Users>;
    deleteUser(user: Users): Promise<void>;
    saveUserData(req: Request, user: Users): Promise<Users>;
}
