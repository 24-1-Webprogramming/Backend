import { ApiProperty } from '@nestjs/swagger';

export class ExerciseCompletionDto {
  @ApiProperty({ description: '운동 완료 ID' })
  id: number;

  @ApiProperty({ description: '사용자 ID' })
  userId: string;

  @ApiProperty({ description: '운동 날짜', example: '2023-06-18' })
  date: string;

  @ApiProperty({ description: '운동 시간 (분)', example: 60 })
  duration: number;

  @ApiProperty({ description: '운동 루틴', example: '루틴 A' })
  routine: string;

  @ApiProperty({ description: '운동 노트', example: '오늘 운동 JMT', required: false })
  notes?: string;
}
