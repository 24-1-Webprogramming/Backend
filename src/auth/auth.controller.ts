import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private userService: UsersService,
      private authService: AuthService,
  ){}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    // redirect google login page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: any,//Request,// & IOAuthUser,
    @Res() res: any,//Response,
  ): Promise<void> {
    let user = await this.userRepository.findOne({where: {"id": req.user.providerId}});
    console.log(req.user.providerId);
    if (!user) {
      const input = {
        type: "google",
        id: await req.user.providerId,
        password: 'OAuth',
        name: await req.user.name,
        age: 0,
      } as CreateUserDto;

      await this.userService.sign_up(input);
    }
    this.authService.setRefreshToken({user, res});

    const jwt: string = this.authService.getAccessToken({user});
    res.cookie('token', jwt, { httpOnly: true });
    return res.status(200).send(jwt);
  }
}

//////find "One"