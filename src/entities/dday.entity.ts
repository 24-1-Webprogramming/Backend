import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class Dday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('date')
  date: Date;

  @Column()
  goal: string;

  @ManyToOne(() => User, user => user.id)
  user: User;
}