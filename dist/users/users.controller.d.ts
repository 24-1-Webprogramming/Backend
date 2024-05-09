import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginInput } from './dto/login_input.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        status: string;
        message: string;
    } | {
        message: string;
        status?: undefined;
    }>;
    login(input: LoginInput, res: Response): Promise<Response<any, Record<string, any>>>;
}
