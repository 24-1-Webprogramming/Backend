import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_stats')
export class Stat {
  @PrimaryGeneratedColumn()
  stat_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  user_id: string;

  @Column({ type: 'int', nullable: true, default: null, unsigned: true })
  health_score: number;

  @Column({ type: 'float', nullable: true, default: null, unsigned: true })
  weight: number;

  @Column({ type: 'int', nullable: true, default: null, unsigned: true })
  gym_id: number;

  @Column({ type: 'date', nullable: true })
  date_log: Date;
}
