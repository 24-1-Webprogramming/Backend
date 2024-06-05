import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('group_members')
export class GroupMember {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ type: 'int' })
  group_id: number;

  @Column({ type: 'tinyint', width: 1 })
  is_leader: Boolean;
}
