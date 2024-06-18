import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseCompletionService } from './exercise-completion.service';

describe('ExerciseCompletionService', () => {
  let service: ExerciseCompletionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseCompletionService],
    }).compile();

    service = module.get<ExerciseCompletionService>(ExerciseCompletionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
