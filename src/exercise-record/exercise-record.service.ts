import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseRecord } from 'src/entities/exercise-record.entity';
import { ExerciseRecordDto } from './dto/exercise-record.dto';

@Injectable()
export class ExerciseRecordService {
  constructor(
    @InjectRepository(ExerciseRecord)
    private readonly exerciseRecordRepository: Repository<ExerciseRecord>,
  ) {}

  async createRecord(userId: string, createExerciseRecordDto: ExerciseRecordDto): Promise<ExerciseRecordDto> {
    const newRecord = this.exerciseRecordRepository.create({
      user_id: userId,
      ...createExerciseRecordDto,
    });
    await this.exerciseRecordRepository.save(newRecord);
    return newRecord;
  }

  async getRecordsByUser(userId: string): Promise<ExerciseRecordDto[]> {
    const records = await this.exerciseRecordRepository.find({ where: { user_id: userId } });
    return records;
  }
}
