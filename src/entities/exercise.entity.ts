import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from './users.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '운동의 식별 id' })
  exercise_id: number;

  @Column({ length: 255 })
  @ApiProperty({ description: '루틴 이름' })
  title: string;

  @Column()
  @ApiProperty({ description: '운동 시간' })
  duration: number;

  @Column()
  @ApiProperty({ description: '칼로리 소모량' })
  caloriesBurned: number;

  @Column()
  @ApiProperty({ description: '운동 날짜' })
  date: Date;

  @Column({ type: 'smallint' })
  @ApiProperty({ description: '완료 여부' })
  isCompleted: number;

  @ManyToOne(() => Users, user => user.exercises)
  @ApiProperty({ description: '사용자 id' })
  user: Users;

  @Column()
  @ApiProperty({ description: '루틴의 id' })
  routine_id: number;
}
