import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseRecordService } from './exercise-record.service';

describe('ExerciseRecordService', () => {
  let service: ExerciseRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseRecordService],
    }).compile();

    service = module.get<ExerciseRecordService>(ExerciseRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
