import { ApiProperty } from '@nestjs/swagger';

export class ExerciseDetailDto {
  @ApiProperty({ description: '운동 날짜' })
  date: Date;

  @ApiProperty({ description: '운동 시간' })
  duration: number;

  @ApiProperty({ description: '칼로리 소모량' })
  caloriesBurned: number;

  @ApiProperty({ description: '운동 제목' })
  exerciseTitle: string;
}

export class MainPageDataDto {
  @ApiProperty({ description: '사용자 정보' })
  user: {
    user_id: string;
    nickname: string;
    profile: string;
  };

  @ApiProperty({ description: '전체 운동 시간' })
  totalDuration: number;

  @ApiProperty({ description: '총 운동 개수' })
  totalExercises: number;

  @ApiProperty({ description: '소모 칼로리' })
  totalCalories: number;

  @ApiProperty({ description: '운동 세부 정보', type: [ExerciseDetailDto] })
  exerciseDetails: ExerciseDetailDto[];
}
