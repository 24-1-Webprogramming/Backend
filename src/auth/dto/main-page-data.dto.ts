import { ApiProperty } from '@nestjs/swagger';

export class ExerciseDetailDto {
  @ApiProperty({ description: '운동 이름' })
  exercise_name: string;

  @ApiProperty({ description: '운동 부위' })
  category: string;

  @ApiProperty({ description: '운동 설명' })
  description: string;

  @ApiProperty({ description: 'GIF 이미지 URL' })
  gif_url: string;
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
