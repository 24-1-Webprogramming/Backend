export declare class CreateUserDto {
    user_id: string;
    nickname: string;
    is_man: boolean;
    d_day: Date;
    password: string;
}
export declare class LoginUserDto {
    user_id: string;
    password: string;
}
export declare class UpdateUserDto {
    nickname: string;
    is_man: boolean;
    d_day: Date;
}
export declare class UserDto {
    user_id: string;
    nickname: string;
    is_man: boolean;
    d_day: Date;
    password: string;
}
export declare class tokensDto {
    info: string;
    token: string;
    refreshToken: string;
}
export declare class acessTokenDto {
    token: string;
}
