import { ApiProperty } from "@nestjs/swagger";

export class DeleteDieWithIdtDto {
    @ApiProperty()
    id: number;
}

export class DeleteDieWithTypeDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    log_date: Date;
    @ApiProperty()
    diet_type: string;
}