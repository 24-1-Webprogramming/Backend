import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post(':userId')
  async createRoutine(
    @Param('userId') userId: number,
    @Body() createRoutineDto: CreateRoutineDto
  ) {
    return this.routineService.createRoutine(userId, createRoutineDto);
  }

  @Get('user/:userId')
  async getRoutineByUser(@Param('userId') userId: number) {
    return this.routineService.getRoutineByUser(userId);
  }
}
