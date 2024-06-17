import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class ExerciseCompletion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @Column()
  date: string;

  @Column()
  duration: number;

  @Column()
  routine: string;

  @Column({ default: '' })
  notes: string;
}
