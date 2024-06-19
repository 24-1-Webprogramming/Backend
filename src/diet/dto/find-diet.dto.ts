import { ApiProperty } from "@nestjs/swagger";

export class FindDietDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    log_date: Date;
}

export class UserIdDto {
    @ApiProperty()
    user_id: string;
}