import { Injectable } from '@nestjs/common';
import { CreateExerciseCompletionDto } from './dto/create-exercise-completion.dto';
import { ExerciseCompletionDto } from './dto/exercise-completion.dto';

@Injectable()
export class ExerciseCompletionService {
  private completions: ExerciseCompletionDto[] = [];
  private idCounter = 1;

  async completeExercise(userId: string, createExerciseCompletionDto: CreateExerciseCompletionDto): Promise<ExerciseCompletionDto> {
    const newCompletion: ExerciseCompletionDto = {
      id: this.idCounter++,
      userId,
      ...createExerciseCompletionDto,
    };
    this.completions.push(newCompletion);
    return newCompletion;
  }

  async getCompletionsByUser(userId: string): Promise<ExerciseCompletionDto[]> {
    return this.completions.filter(completion => completion.userId === userId);
  }
}
