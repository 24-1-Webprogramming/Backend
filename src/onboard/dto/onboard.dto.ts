import { ApiProperty } from "@nestjs/swagger";

export class onboardDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    purpose: string;
    @ApiProperty()
    period: number;
    @ApiProperty()
    push_up: number;
    @ApiProperty()
    goal: number;
}