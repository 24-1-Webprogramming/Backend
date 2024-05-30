import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

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
    unique: true,
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
}

