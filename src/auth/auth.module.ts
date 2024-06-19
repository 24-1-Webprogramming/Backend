import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalServiceStrategy } from './strategies/local-service.strategy';
import { JwtServiceStrategy } from './strategies/jwt-service.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/newStrategy.strategy';
import { JwtAuthGuard } from './guards/newguard.guard';
import { Onboard_conditions } from 'src/entities/onboard_conditions.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Onboard_conditions]),
    PassportModule.register({ session: false }),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),

    //legacy
    /*
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: {expiresIn: '1w'},
        };
      },
      inject: [ConfigService],
    })*/
  ],
  providers: [AuthService, LocalServiceStrategy, JwtServiceStrategy, GoogleStrategy, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard]
})
export class AuthModule {}
