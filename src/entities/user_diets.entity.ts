import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_diets')
export class User_diets {
  @PrimaryGeneratedColumn()
  diet_id: number;

  @Column({ type: 'varchar', length: 255, default: null })
  user_id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  diet_name: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  diet_type: string;

  @Column({ type: 'int', nullable: true, default: null })
  calories: number;

  @Column({ type: 'int', nullable: true, default: null })
  carbohydrate: number;

  @Column({ type: 'int', nullable: true, default: null })
  protein: number;

  @Column({ type: 'int', nullable: true, default: null })
  fat: number;

  @Column({ type: 'date', nullable: false })
  log_date: Date;
}