import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('routines')
export class Routine {
  @PrimaryGeneratedColumn()
  routine_id: number;

  @Column()
  title: string;

  @Column()
  duration: number; // in minutes

  @Column()
  exercise: string; // JSON string of exercises

  @Column()
  caloriesBurned: number;

  @Column()
  user_id: string;

  @ManyToOne(() => Users, user => user.user_id)
  @JoinColumn({name: 'user_id'})
  user: Users;
}