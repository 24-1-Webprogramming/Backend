import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Exercise } from './entities/exercise.entity';
import { Routine } from './entities/routine.entity';
import { ExerciseCompletion } from './entities/exercise-completion.entity';
import { ExerciseRecord } from './entities/exercise-record.entity';
import { Gym } from './entities/gym.entity';
import { UserService } from './user/user.service';
import { ExerciseService } from './exercise/exercise.service';
import { RoutineService } from './routine/routine.service';
import { ExerciseCompletionService } from './exercise-completion/exercise-completion.service';
import { ExerciseRecordService } from './exercise-record/exercise-record.service';
import { GymService } from './gym/gym.service';
import { UserController } from './user/user.controller';
import { ExerciseController } from './exercise/exercise.controller';
import { RoutineController } from './routine/routine.controller';
import { ExerciseCompletionController } from './exercise-completion/exercise-completion.controller';
import { ExerciseRecordController } from './exercise-record/exercise-record.controller';
import { GymController } from './gym/gym.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Exercise, Routine, ExerciseCompletion, ExerciseRecord, Gym]),
  ],
  controllers: [
    UserController,
    ExerciseController,
    RoutineController,
    ExerciseCompletionController,
    ExerciseRecordController,
    GymController,
  ],
  providers: [
    UserService,
    ExerciseService,
    RoutineService,
    ExerciseCompletionService,
    ExerciseRecordService,
    GymService,
  ],
})
export class AppModule {}
