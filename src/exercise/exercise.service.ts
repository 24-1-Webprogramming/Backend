import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { MainPageDataDto, ExerciseDetailDto } from 'src/auth/dto/main-page-data.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async getMainPageData(userId: string): Promise<MainPageDataDto> {
    const user = await this.userRepository.findOne({ where: { user_id: userId }, relations: ['exercises'] });
    if (!user) {
      throw new Error('User not found');
    }

    const exercises = await this.exerciseRepository.find({ where: { user: { user_id: userId } } });
    const totalDuration = exercises.reduce((sum, exercise) => sum + exercise.duration, 0);
    const totalCalories = exercises.reduce((sum, exercise) => sum + exercise.caloriesBurned, 0);

    const exerciseDetails: ExerciseDetailDto[] = exercises.map(exercise => ({
      date: exercise.date,
      duration: exercise.duration,
      caloriesBurned: exercise.caloriesBurned,
      exerciseTitle: exercise.title,
    }));

    return {
      user: {
        user_id: user.user_id,
        nickname: user.nickname,
        profile: user.profile,
      },
      totalDuration,
      totalExercises: exercises.length,
      totalCalories,
      exerciseDetails,
    };
  }
}
