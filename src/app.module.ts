import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Users } from './entities/users.entity';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onboard_conditions } from './entities/onboard_conditions.entity';
import { OnboardModule } from './onboard/onboard.module';
import { DietModule } from './diet/diet.module';
import { User_diets } from './entities/user_diets.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "3.38.212.126",
      port: 3306,
      username: 'health_dev',
      password: 'health2024!@',
      database: 'health',
      entities: [Users, Onboard_conditions, User_diets],
      //synchronize: false,
      //logging: true,
    }),
    AuthModule,
    OnboardModule,
    DietModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
