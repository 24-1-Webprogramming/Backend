import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMainPageData(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['exercises'] });
    if (!user) {
      throw new Error('User not found');
    }

    const exercises = await this.exerciseRepository.find({ where: { user: { id: userId } } });
    const totalDuration = exercises.reduce((sum, exercise) => sum + exercise.duration, 0);
    const totalCalories = exercises.reduce((sum, exercise) => sum + exercise.caloriesBurned, 0);
    const routineCompletionRate = this.calculateRoutineCompletionRate(user);

    const exerciseDetails = exercises.map(exercise => ({
      date: exercise.date,
      duration: exercise.duration,
      caloriesBurned: exercise.caloriesBurned,
      exerciseTitle: exercise.title,
    }));

    return {
      user: {
        id: user.id,
        nickname: user.nickname,
        profile: user.profile,
      },
      totalDuration,
      totalExercises: exercises.length,
      totalCalories,
      routineCompletionRate,
      exerciseDetails,
    };
  }

  private calculateRoutineCompletionRate(user: User): number {
    const completedRoutines = user.exercises.filter(exercise => exercise.isCompleted).length;
    const totalRoutines = user.exercises.length;
    return totalRoutines ? (completedRoutines / totalRoutines) * 100 : 0;
  }
}
