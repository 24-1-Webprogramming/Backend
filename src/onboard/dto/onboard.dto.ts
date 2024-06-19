import { ApiProperty } from "@nestjs/swagger";

export class onboardDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    purpose: string;
    @ApiProperty()
    period: string;
    @ApiProperty()
    push_up: string;
    @ApiProperty()
    goal: string;
}