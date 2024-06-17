import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Post()
  async createGym(@Body() createGymDto: CreateGymDto) {
    return this.gymService.createGym(createGymDto);
  }

  @Get()
  async getGyms() {
    return this.gymService.getGyms();
  }

  @Get(':id')
  async getGymById(@Param('id') id: number) {
    return this.gymService.getGymById(id);
  }

  @Get('location')
  async getGymsByLocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number
  ) {
    return this.gymService.getGymsByLocation(latitude, longitude);
  }
}
