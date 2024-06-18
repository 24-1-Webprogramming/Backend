import { Controller, Post, Body, Param } from '@nestjs/common';
import { WeightService } from './weight.service';

@Controller('weight')
export class WeightController {
  constructor(private readonly weightService: WeightService) {}

  @Post(':userId')
  async createWeight(@Param('userId') userId: string, @Body('weight') weight: number) {
    return this.weightService.createWeight(userId, weight);
  }
}