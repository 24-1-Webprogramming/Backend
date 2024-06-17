import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseRecord } from 'src/entities/exercise-record.entity';
import { CreateExerciseRecordDto } from './dto/create-exercise-record.dto';

@Injectable()
export class ExerciseRecordService {
  constructor(
    @InjectRepository(ExerciseRecord)
    private readonly exerciseRecordRepository: Repository<ExerciseRecord>,
  ) {}

  async createRecord(userId: number, createExerciseRecordDto: CreateExerciseRecordDto): Promise<ExerciseRecord> {
    const newRecord = this.exerciseRecordRepository.create({ ...createExerciseRecordDto, user: { id: userId } });
    return this.exerciseRecordRepository.save(newRecord);
  }

  async getRecordsByUser(userId: number): Promise<ExerciseRecord[]> {
    return this.exerciseRecordRepository.find({ where: { user: { id: userId } } });
  }
}
