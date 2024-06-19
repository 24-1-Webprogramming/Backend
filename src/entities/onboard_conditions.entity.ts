import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('onboard_conditions')
export class Onboard_conditions {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  purpose: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  period: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  push_up: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  goal: string;
}
