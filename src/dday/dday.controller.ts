import { Controller, Post, Body, Param } from '@nestjs/common';
import { DdayService } from './dday.service';

@Controller('dday')
export class DdayController {
  constructor(private readonly ddayService: DdayService) {}

  @Post(':userId')
  async createDday(@Param('userId') userId: number, @Body() body: { title: string, date: string, goal: string }) {
    const { title, date, goal } = body;
    return this.ddayService.createDday(userId, title, new Date(date), goal);
  }
}
