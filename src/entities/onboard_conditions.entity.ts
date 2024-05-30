import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('onboard_conditions')
export class Onboard_conditions {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  purpose: string;

  @Column({ type: 'smallint', width: 5, nullable: true, default: null })
  period: number;

  @Column({ type: 'smallint', width: 5, nullable: true, default: null })
  push_up: number;

  @Column({ type: 'smallint', width: 6, nullable: true, default: null })
  goal: number;
}
