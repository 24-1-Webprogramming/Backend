import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseRecordDto {
  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly feeling: string;

  @ApiProperty()
  readonly note: string;

  @ApiProperty()
  readonly routine: string;

  @ApiProperty()
  readonly calories: number;
}