import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gyms')
export class Gym {
  @PrimaryGeneratedColumn()
  gym_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'double', nullable: true })
  lat: number;

  @Column({ type: 'double', nullable: true })
  lng: number;

  @Column({ type: 'tinyint', width: 1, nullable: true })
  is_one_day: boolean;

  @Column({ type: 'tinyint', width: 1, nullable: true })
  is_ot_free: boolean;

  @Column({ type: 'tinyint', width: 1, nullable: true })
  is_inbody: boolean;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  price_type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_path: string;
}
