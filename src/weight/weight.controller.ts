import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { WeightService } from './weight.service';
import { CreateWeightDto } from './dto/create-weight.dto';

@ApiTags('weight API')
@Controller('weight')
export class WeightController {
  constructor(private readonly weightService: WeightService) {}

  @Post(':userId')
  @ApiOperation({ summary: '체중 기록 생성', description: '특정 사용자의 체중 기록을 생성합니다.' })
  @ApiParam({ name: 'userId', required: true, description: '사용자의 ID' })
  @ApiBody({ type: CreateWeightDto, description: '체중 기록 정보' })
  @ApiResponse({ status: 201, description: '체중 기록이 성공적으로 생성되었습니다.' })
  async createWeight(
    @Param('userId') userId: string,
    @Body() createWeightDto: CreateWeightDto
  ): Promise<void> {
    return this.weightService.createWeight(userId, createWeightDto.weight);
  }
}
