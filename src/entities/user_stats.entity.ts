import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_stats')
export class Stat {
  @PrimaryGeneratedColumn()
  stat_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  user_id: string;

  @Column({ type: 'date', nullable: true })
  data_log: Date;

  @Column({ type: 'int', nullable: true, default: null })
  health_score: number;

  @Column({ type: 'float', nullable: true, default: null })
  weight: number;
}
