import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  readonly nickname: string;

  @ApiProperty()
  readonly profile: string;

  @ApiProperty({ required: false })
  readonly isFirstLogin?: boolean;
}
