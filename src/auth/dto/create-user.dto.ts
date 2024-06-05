import { ApiProperty, PickType } from "@nestjs/swagger";
import { Users } from "src/entities/users.entity";

export class CreateUserDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    nickname: string;
    @ApiProperty()
    is_man: boolean;
    @ApiProperty()
    d_day: Date;
    @ApiProperty()
    password: string;
}

export class LoginUserDto extends PickType(Users, ['user_id', 'password']) {}

export class UpdateUserDto {
    @ApiProperty()
    nickname: string;
    @ApiProperty()
    is_man: boolean;
    @ApiProperty()
    d_day: Date;
}
