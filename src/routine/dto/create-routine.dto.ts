import { ApiProperty } from '@nestjs/swagger';

export class CreateRoutineDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly duration: number;

  @ApiProperty({ type: [String] })
  readonly exercises: string[];

  @ApiProperty()
  readonly caloriesBurned: number;
}
