import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseCompletion } from '../entities/exercise-completion.entity';

@Injectable()
export class ExerciseCompletionService {
  constructor(
    @InjectRepository(ExerciseCompletion)
    private readonly exerciseCompletionRepository: Repository<ExerciseCompletion>,
  ) {}

  async completeExercise(userId: string, date: string, duration: number, routine: string, notes: string): Promise<ExerciseCompletion> {
    const newCompletion = this.exerciseCompletionRepository.create({ user: { user_id: userId }, date, duration, routine, notes });
    return this.exerciseCompletionRepository.save(newCompletion);
  }

  async getCompletionsByUser(userId: string): Promise<ExerciseCompletion[]> {
    return this.exerciseCompletionRepository.find({ where: { user: { user_id: userId } } });
  }
}