import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
//typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/users.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule,
  ],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
