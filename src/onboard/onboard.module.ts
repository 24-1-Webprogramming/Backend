import { Module } from '@nestjs/common';
import { OnboardService } from './onboard.service';
import { OnboardController } from './onboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Onboard_conditions } from 'src/entities/onboard_conditions.entity';
import { JwtServiceStrategy } from 'src/auth/strategies/jwt-service.strategy';
import { JwtStrategy } from 'src/auth/strategies/newStrategy.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Onboard_conditions]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: {expiresIn: '5m'},
        };
      },
      inject: [ConfigService],
    })
  ],
  providers: [OnboardService, JwtServiceStrategy, JwtStrategy],
  controllers: [OnboardController],
})
export class OnboardModule {}
