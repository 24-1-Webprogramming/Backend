import { ApiProperty } from '@nestjs/swagger';

export class ExerciseMainPageDto {
  @ApiProperty()
  readonly date: Date;

  @ApiProperty()
  readonly duration: number;

  @ApiProperty()
  readonly caloriesBurned: number;

  @ApiProperty()
  readonly exerciseTitle: string;
}
