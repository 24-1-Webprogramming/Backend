import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseCompletionController } from './exercise-completion.controller';

describe('ExerciseCompletionController', () => {
  let controller: ExerciseCompletionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseCompletionController],
    }).compile();

    controller = module.get<ExerciseCompletionController>(ExerciseCompletionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
