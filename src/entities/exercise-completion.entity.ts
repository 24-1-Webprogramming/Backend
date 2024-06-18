import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('exercise_completions')
export class ExerciseCompletion {
  @PrimaryGeneratedColumn()
  exercise_id: number;

  @Column()
  date: string;

  @Column()
  duration: number;

  @Column()
  routine: string;

  @Column({ default: '' })
  notes: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Users, user => user.user_id)
  @JoinColumn({name: 'user_id'})
  user: Users;
}