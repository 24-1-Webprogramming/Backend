import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_diets } from 'src/entities/user_diets.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceStrategy } from 'src/auth/strategies/jwt-service.strategy';
import { JwtStrategy } from 'src/auth/strategies/newStrategy.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User_diets]),
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
  providers: [DietService, JwtServiceStrategy, JwtStrategy],
  controllers: [DietController]
})
export class DietModule {}
