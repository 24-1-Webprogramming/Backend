import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { GymService } from './gym.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GymDto, SearchGymDto } from './dto/gym.dto';
import { CreateGymDto } from './dto/create-gym.dto';

@ApiTags('gym API')
@Controller('gym')
export class GymController {
    constructor(
        private readonly gymService: GymService
    ) {}

    @ApiBearerAuth()
    @Post('searchGymByLocal')
    @ApiOperation({summary: '헬스장 검색 AI', description: '해당 지역의 헬스장을 찾는다 ex) "상도동" '})
    @ApiBody({type: SearchGymDto})
    @ApiResponse({ status: 200, description: 'FOUND', type: GymDto})
    @ApiResponse({ status: 204, description: 'NOT_FOUND'})
    async searchGymByLocal(@Body() body: SearchGymDto, @Res() res) {
        let gymList = await this.gymService.findByLocal(body);
        res.status(HttpStatus.OK).json(gymList);
    }

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
