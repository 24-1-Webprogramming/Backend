import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";
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

export class LoginUserDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    password: string;
}

export class UpdateUserDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    nickname: string;
    @ApiProperty()
    is_man: boolean;
    @ApiProperty()
    d_day: Date;
}

export class UserDto {
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

export class tokensDto {
    @ApiProperty()
    info: string;
    @ApiProperty()
    token: string;
    @ApiProperty()
    refreshToken: string;
}

export class acessTokenDto {
    @ApiProperty()
    token: string;
}

export class findUserDto {
    @ApiProperty()
    user_id: string;
}

export class GoogleTokenDto {
  @ApiProperty()
  @IsString()
  credential: string;
}