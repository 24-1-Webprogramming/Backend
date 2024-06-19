import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exercise_records')
export class ExerciseRecord {
  @PrimaryGeneratedColumn()
  exercise_id: number;

  @Column()
  date: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  feeling?: string;

  @Column({ nullable: true })
  note?: string;

  @Column()
  routine: string;

  @Column()
  caloriesBurned: number;

  @Column()
  user_id: string;
}
