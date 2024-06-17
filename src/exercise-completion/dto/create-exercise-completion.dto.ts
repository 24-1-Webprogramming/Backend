import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseCompletionDto {
  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly duration: number;

  @ApiProperty()
  readonly routine: string;

  @ApiProperty({ required: false })
  readonly notes: string;
}
