import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './GoogleStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "secret",//jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule
  ],
  providers: [AuthService, GoogleStrategy, JwtStrategy, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
