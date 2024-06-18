import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  exercise_id: number;

  @Column()
  title: string;

  @Column()
  duration: number;

  @Column()
  caloriesBurned: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @ManyToOne(() => Users, (user) => user.exercises)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}