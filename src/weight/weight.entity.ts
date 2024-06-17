import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class Weight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  weight: number;

  @ManyToOne(() => User, user => user.id)
  user: User;
}
