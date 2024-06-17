import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: number; // in minutes

  @Column()
  exercises: string; // JSON string of exercises

  @Column()
  caloriesBurned: number;

  @ManyToOne(() => User, user => user.id)
  user: User;
}
