import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseCompletionDto {
  @ApiProperty({ description: '운동 날짜', example: '2024-06-18' })
  date: string;

  @ApiProperty({ description: '운동 시간 (분)', example: 60 })
  duration: number;

  @ApiProperty({ description: '운동 루틴', example: '루틴 A' })
  routine: string;

  @ApiProperty({ description: '운동 노트', example: '오늘 운동 JMT', required: false })
  notes?: string;
}
