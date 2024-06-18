import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Exercise } from './exercise.entity';
import { Routine } from './routine.entity';

@Entity('users')
export class Users {
  @PrimaryColumn({
    type: 'varchar',
  })
  user_id: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 20,
    nullable: true
  })
  nickname: string | null;

  @Column({
    type: 'boolean',
    nullable: true
  })
  is_man: boolean | null;

  @Column({
    type: 'date',
    nullable: true
  })
  d_day: Date | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  password: string | null;

  @Column({
    type: 'boolean',
    nullable: true
  })
  isFirstLogin: boolean | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  profile: string | null;

  @OneToMany(() => Exercise, exercise => exercise.user)
  exercises: Exercise[];
}

