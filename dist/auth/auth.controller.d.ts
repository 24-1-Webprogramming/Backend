import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    postJoin(createUserDto: CreateUserDto, res: any): Promise<any>;
    postLogin(req: any, res: any): Promise<void>;
    googleAuthCallback(req: any, res: any): Promise<any>;
    googleAuth(req: any, res: any): Promise<void>;
    getProfile(req: any, res: any): Promise<void>;
    changeProfile(userDto: UpdateUserDto, req: any, res: any): Promise<void>;
    refresh(req: Request, res: any): Promise<void>;
    secession(req: Request, res: any): Promise<void>;
}
