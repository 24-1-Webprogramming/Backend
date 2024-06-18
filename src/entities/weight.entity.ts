import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('weights')
export class Weight {
  @PrimaryGeneratedColumn()
  weight_id: number;

  @Column('float')
  weight: number;

  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @ManyToOne(() => Users, user => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}