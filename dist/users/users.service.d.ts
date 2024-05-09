import { Repository } from 'typeorm';
import { User } from '../database/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    checkPassword(createUserDto: CreateUserDto): Promise<boolean>;
    checkDuplication(createUserDto: CreateUserDto): Promise<boolean>;
    sign_up(createUserDto: CreateUserDto): Promise<void>;
    leave(createUserDto: CreateUserDto): Promise<void>;
    findOne(id: string): Promise<User>;
}
