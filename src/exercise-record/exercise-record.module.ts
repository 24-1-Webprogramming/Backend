import { Module } from '@nestjs/common';
import { ExerciseRecordController } from './exercise-record.controller';
import { ExerciseRecordService } from './exercise-record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseRecord } from 'src/entities/exercise-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseRecord])
  ],
  controllers: [ExerciseRecordController],
  providers: [ExerciseRecordService]
})
export class ExerciseRecordModule {}
