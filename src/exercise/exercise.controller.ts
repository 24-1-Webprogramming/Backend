import { Controller, Get, Param } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('main/:userId')
  async getMainPageData(@Param('userId') userId: number) {
    return this.exerciseService.getMainPageData(userId);
  }
}
