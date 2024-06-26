import { Module } from '@nestjs/common';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';
import { Gym } from 'src/entities/gyms.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Image_assets } from 'src/entities/image_assets.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gym, Image_assets]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: {expiresIn: '5m'}
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [GymService],
  controllers: [GymController],
  exports: [GymModule]
})
export class GymModule {}
