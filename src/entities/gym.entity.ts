import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  description: string;

  @Column()
  dailyPrice: number;

  @Column()
  monthlyPrice: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  imageUrl: string;
}
