import { ApiProperty } from '@nestjs/swagger';

export class CreateWeightDto {
  @ApiProperty({ description: '체중', example: 70.5 })
  weight: number;
}
