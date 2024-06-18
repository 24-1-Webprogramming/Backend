import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exercise_items')
export class ExerciseItem {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column({ length: 10 })
  category: string;

  @Column({ length: 255 })
  exercise_name: string;

  @Column({ length: 255 })
  gif_url: string;

  @Column({ length: 255 })
  description: string;
}
