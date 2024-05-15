import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({
    type: 'varchar',
  })
  user_id: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 20
  })
  nickname: string;

  @Column({
    type: 'boolean',
    unique: true
  })
  is_man: boolean;

  @Column({
    type: 'date'
  })
  d_day: Date;

  @Column({
    type: 'varchar',
    length: 255
  })
  password: string;
}
