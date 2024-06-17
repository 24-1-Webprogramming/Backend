import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ExerciseCompletionService } from './exercise-completion.service';
import { CreateExerciseCompletionDto } from './dto/create-exercise-completion.dto';

@Controller('exercise-completion')
export class ExerciseCompletionController {
  constructor(private readonly exerciseCompletionService: ExerciseCompletionService) {}

  @Post(':userId')
  async completeExercise(
    @Param('userId') userId: number,
    @Body() createExerciseCompletionDto: CreateExerciseCompletionDto
  ) {
    const { date, duration, routine, notes } = createExerciseCompletionDto;
    return this.exerciseCompletionService.completeExercise(userId, date, duration, routine, notes);
  }

  @Get(':userId')
  async getCompletionsByUser(@Param('userId') userId: number) {
    return this.exerciseCompletionService.getCompletionsByUser(userId);
  }
}
