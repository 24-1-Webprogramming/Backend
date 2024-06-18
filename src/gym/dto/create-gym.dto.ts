import { ApiProperty } from '@nestjs/swagger';

export class CreateGymDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly dailyPrice: number;

  @ApiProperty()
  readonly monthlyPrice: number;

  @ApiProperty()
  readonly latitude: number;

  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly imageUrl: string;
}