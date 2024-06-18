import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseItemDto {
  @ApiProperty({ description: '운동 부위', example: '하체' })
  category: string;

  @ApiProperty({ description: '운동 이름', example: '스쿼트' })
  exercise_name: string;

  @ApiProperty({ description: 'GIF 이미지 경로', example: 'http://example.com/squat.gif' })
  gif_url: string;

  @ApiProperty({ description: '운동 설명', example: '스쿼트는 다리 운동입니다.' })
  description: string;
}
