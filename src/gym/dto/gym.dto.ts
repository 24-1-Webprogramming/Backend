import { ApiProperty } from "@nestjs/swagger";

export class SearchGymDto {
    @ApiProperty()
    address: string
}