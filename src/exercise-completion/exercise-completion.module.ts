import { Module } from '@nestjs/common';
import { ExerciseCompletionService } from './exercise-completion.service';
import { ExerciseCompletionController } from './exercise-completion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseCompletion } from 'src/entities/exercise-completion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseCompletion])
  ],
  providers: [ExerciseCompletionService],
  controllers: [ExerciseCompletionController]
})
export class ExerciseCompletionModule {}
