import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { ExerciseItem } from '../entities/exercise-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseItem])],
  providers: [ExerciseService],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
