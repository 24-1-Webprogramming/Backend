import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseItem } from '../entities/exercise-item.entity';
import { MainPageDataDto, ExerciseDetailDto } from 'src/auth/dto/main-page-data.dto';
import { ExerciseItemDto } from 'src/exercise/dto/exercise-item.dto'; // 수정된 경로

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseItem)
    private readonly exerciseItemRepository: Repository<ExerciseItem>,
  ) {}

  async getMainPageData(userId: string): Promise<MainPageDataDto> {
    const exerciseItems = await this.exerciseItemRepository.find();

    const totalDuration = exerciseItems.reduce((sum, item) => sum + 20, 0); // 예: 각 운동 20분
    const totalExercises = exerciseItems.length;
    const totalCalories = exerciseItems.reduce((sum, item) => sum + 300, 0); // 예: 각 운동 300kcal

    const exerciseDetails: ExerciseDetailDto[] = exerciseItems.map(item => ({
      exercise_name: item.exercise_name,
      category: item.category,
      description: item.description,
      gif_url: item.gif_url,
    }));

    return {
      user: {
        user_id: userId,
        nickname: 'Sample Nickname', // 샘플 데이터, 실제 데이터로 대체 필요
        profile: 'Sample Profile', // 샘플 데이터, 실제 데이터로 대체 필요
      },
      totalDuration,
      totalExercises,
      totalCalories,
      exerciseDetails, // 올바른 필드 이름 사용
    };
  }

  async getExerciseItems(): Promise<ExerciseItemDto[]> {
    const exerciseItems = await this.exerciseItemRepository.find();
    return exerciseItems.map(item => ({
      item_id: item.item_id,
      category: item.category,
      exercise_name: item.exercise_name,
      gif_url: item.gif_url,
      description: item.description,
    }));
  }
}
