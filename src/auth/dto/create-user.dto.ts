import { PickType } from "@nestjs/swagger";
import { User } from "src/entities/user.entity";

export class CreateUserDto {
    user_id: string;
    nickname: string;
    is_man: boolean;
    d_day: Date;
    password: string;
}

export class 
LoginUserDto extends PickType(User, ['user_id', 'password']) {}

export class UpdateUserDto {
    nickname: string;
    is_man: boolean;
    d_day: Date;
}
