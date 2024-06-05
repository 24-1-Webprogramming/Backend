import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('families')
export class Group {
  @PrimaryGeneratedColumn()
  family_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', nullable: true })
  score: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  group_code: string;
}
