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
