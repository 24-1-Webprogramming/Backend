import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('exercise_records')
export class ExerciseRecord {
  @PrimaryColumn()
  exercise_id: number;

  @Column()
  date: string;

  @Column()
  imageUrl: string;

  @Column()
  feeling: string;

  @Column()
  note: string;

  @Column()
  routine: string;

  @Column()
  calories: number;

  @Column()
  user_id: string;

  @ManyToOne(() => Users, user => user.user_id)
  @JoinColumn({name: 'user_id'})
  user: Users;
}