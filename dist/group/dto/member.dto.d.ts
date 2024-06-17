export declare class CreateMemberDto {
    user_id: string;
    group_id: number;
    is_leader: Boolean;
}
export declare class SetLeaderDto {
    target_user_id: string;
    group_id: number;
}
export declare class MemberDto {
    user_id: string;
    group_id: number;
    is_leader: boolean;
}
