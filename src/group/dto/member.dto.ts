import { ApiProperty, PickType } from "@nestjs/swagger";

export class CreateMemberDto {
    @ApiProperty()
    user_id: string
    @ApiProperty()
    group_id: number
    @ApiProperty()
    is_leader: Boolean
}

export class SetLeaderDto {
    @ApiProperty()
    user_id: string
    @ApiProperty()
    target_user_id: string
    @ApiProperty()
    group_id: number
}

export class MemberDto {
    @ApiProperty()
    user_id: string
    @ApiProperty()
    group_id: number
    @ApiProperty()
    is_leader: boolean
}