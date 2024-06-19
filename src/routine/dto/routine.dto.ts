import { ApiProperty } from '@nestjs/swagger';

export class RoutineDto {
  @ApiProperty({ description: '루틴 ID' })
  id: number;

  @ApiProperty({ description: '루틴 이름' })
  name: string;

  @ApiProperty({ description: '루틴 설명' })
  description: string;

  @ApiProperty({ description: '루틴 시작 날짜' })
  startDate: Date;

  @ApiProperty({ description: '루틴 종료 날짜' })
  endDate: Date;

  @ApiProperty({ description: '사용자 ID' })
  userId: string;
}
