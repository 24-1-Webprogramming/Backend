import { PickType } from "@nestjs/swagger";
import { Users } from "src/entities/users.entity";

export class CreateUserDto {
    user_id: string;
    nickname: string;
    is_man: boolean;
    d_day: Date;
    password: string;
}

export class LoginUserDto extends PickType(Users, ['user_id', 'password']) {}

export class UpdateUserDto {
    nickname: string;
    is_man: boolean;
    d_day: Date;
}
