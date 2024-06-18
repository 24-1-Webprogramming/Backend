import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ExerciseRecordService } from './exercise-record.service';
import { CreateExerciseRecordDto } from './dto/create-exercise-record.dto';

@Controller('exercise-record')
export class ExerciseRecordController {
  constructor(private readonly exerciseRecordService: ExerciseRecordService) {}

  @Post(':userId')
  async createRecord(
    @Param('userId') userId: string,
    @Body() createExerciseRecordDto: CreateExerciseRecordDto
  ) {
    return this.exerciseRecordService.createRecord(userId, createExerciseRecordDto);
  }

  @Get(':userId')
  async getRecordsByUser(@Param('userId') userId: string) {
    return this.exerciseRecordService.getRecordsByUser(userId);
  }
}