import { ApiProperty } from '@nestjs/swagger';

export class UpdateExerciseDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly duration: string;

  @ApiProperty()
  readonly details: string;
}
