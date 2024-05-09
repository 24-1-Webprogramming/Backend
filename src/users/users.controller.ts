import { Body, Controller, Post, Res, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginInput } from './dto/login_input.dto';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ){}

    @Post('/sign_up')
    async create(@Body() createUserDto: CreateUserDto){
        createUserDto.type = "manual";
        let con1 = await this.usersService.checkPassword(createUserDto);
        let con2 = await this.usersService.checkDuplication(createUserDto);
        console.log(con1);
        if (!con1){
            return {"status": "fail", "message": "inappropriate password"}
        }
        else if (!con2) {
            return {"status": "fail", "message": "duplicated id"}
        }
        await this.usersService.sign_up(createUserDto);
        return {"message": `account succesfully created : (${createUserDto.name})`};
    }

    @Post('/login')
    async login(@Body() input: LoginInput, @Res() res: Response) {
        const { id, password } = input;
        const user = await this.usersService.findOne(id);
        console.log(user);

        if (!user) {
            throw new UnprocessableEntityException('account does not exist');
        }

        const isAuth = await bcrypt.compare(password, user.password);

        if (!isAuth) {
            throw new UnprocessableEntityException('password is not matched');
        }
        const jwt = this.authService.getAccessToken({ user });
        //console.log(res);
        res.cookie('token', jwt, { httpOnly: true });
        return res.status(200).send(jwt);
    }
}
