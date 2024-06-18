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
import { ConfigModule } from '@nestjs/config';
import { GroupModule } from './group/group.module';
import { Group } from './entities/groups.entity';
import { GroupMember } from './entities/group_members.entity';
import { GymModule } from './gym/gym.module';
import { Gym } from './entities/gyms.entity';
import { Image_assets } from './entities/image_assets.entity';
import { Stat } from './entities/user_stats.entity';
import { ExerciseModule } from './exercise/exercise.module';
import { Exercise } from './entities/exercise.entity';
import { RoutineModule } from './routine/routine.module';
import { Routine } from './entities/routine.entity';
import { ExerciseRecordModule } from './exercise-record/exercise-record.module';
import { ExerciseRecord } from './entities/exercise-record.entity';
import { ExerciseCompletionModule } from './exercise-completion/exercise-completion.module';
import { ExerciseCompletion } from './entities/exercise-completion.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'health',
      entities: [Users, Onboard_conditions, User_diets, Group, GroupMember, Gym, Image_assets, Stat, Exercise, Routine, ExerciseRecord, ExerciseCompletion],
      synchronize: false,
      logging: false,
    }),
    AuthModule,
    OnboardModule,
    DietModule,
    GroupModule,
    GymModule,
    ExerciseModule,
    RoutineModule,
    ExerciseRecordModule,
    ExerciseCompletionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
