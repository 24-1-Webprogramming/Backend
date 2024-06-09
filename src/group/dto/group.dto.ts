import { ApiProperty, PickType } from "@nestjs/swagger";

export class GroupDto {
    @ApiProperty()
    family_id: number
    @ApiProperty()
    name: string
    @ApiProperty()
    score: number
    @ApiProperty()
    group_code: number
}

export class CreateGroupDto {
    @ApiProperty()
    name: string
}

export class SearchGroupDto {
    @ApiProperty()
    search_id: number
}

export class GroupCodeDto {
    @ApiProperty()
    code: string
}

export class SetGroupDto {
    @ApiProperty()
    family_id: number
    @ApiProperty()
    name: string
    @ApiProperty()
    score: number
    @ApiProperty()
    group_code: string
}
