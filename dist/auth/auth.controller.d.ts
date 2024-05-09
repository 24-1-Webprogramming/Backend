import { User } from 'src/database/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userRepository;
    private userService;
    private authService;
    constructor(userRepository: Repository<User>, userService: UsersService, authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any, res: any): Promise<void>;
}
