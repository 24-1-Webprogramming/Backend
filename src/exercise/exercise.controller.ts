import { Controller, Get, Param } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('main/:userId')
  async getMainPageData(@Param('user_id') user_id: string) {
    return this.exerciseService.getMainPageData(user_id);
  }
}