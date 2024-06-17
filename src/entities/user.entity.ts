import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exercise } from 'src/entities/exercise.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  profile: string;

  @Column({ default: true })
  isFirstLogin: boolean;

  @OneToMany(() => Exercise, exercise => exercise.user)
  exercises: Exercise[];
}
