import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class ExerciseRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

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
}
