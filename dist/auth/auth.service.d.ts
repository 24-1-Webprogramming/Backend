import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/users.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    getAccessToken({ user }: {
        user: any;
    }): string;
    setRefreshToken({ user, res }: {
        user: any;
        res: any;
    }): void;
}
