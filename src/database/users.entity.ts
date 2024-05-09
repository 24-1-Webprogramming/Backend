import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'index_id'
  })
  index_id: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  password: string;

  @Column({
    type: 'smallint',
    unsigned: true,
    default: 0
  })
  age: number;
}
