import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly duration: number;

  @ApiProperty()
  readonly caloriesBurned: number;

  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly isCompleted: boolean;
}
