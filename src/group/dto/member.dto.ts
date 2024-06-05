import { ApiProperty, PickType } from "@nestjs/swagger";

export class CreateMemberDto {
    @ApiProperty()
    user_id: string
    @ApiProperty()
    group_id: number
    @ApiProperty()
    is_leader: Boolean
}