import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => User, user => user.exercises)
  user: User;
}