import { ApiProperty } from '@nestjs/swagger';

export class ExerciseRecordDto {
  @ApiProperty({ description: '기록 ID' })
  exercise_id: number;

  @ApiProperty({ description: '날짜 (문자열)', example: '2023-06-18' })
  date: string;

  @ApiProperty({ description: '이미지 주소', required: false, example: 'http://example.com/image.png' })
  imageUrl?: string;

  @ApiProperty({ description: '기분 (선택)', example: '좋음' })
  feeling?: string;

  @ApiProperty({ description: '한 줄 일기', example: '오늘 운동 JMT' })
  note?: string;

  @ApiProperty({ description: '오늘의 루틴', example: '루틴 A' })
  routine: string;

  @ApiProperty({ description: '칼로리 소모량', example: 300 })
  caloriesBurned: number;

  @ApiProperty({ description: '사용자 ID' })
  user_id: string;
}
