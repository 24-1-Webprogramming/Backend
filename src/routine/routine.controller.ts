import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { RoutineDto } from './dto/routine.dto';

@ApiTags('routine API')
@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post(':userId')
  @ApiOperation({ summary: '루틴 생성', description: '특정 사용자의 루틴을 생성합니다.' })
  @ApiParam({ name: 'userId', required: true, description: '사용자의 ID' })
  @ApiBody({ type: CreateRoutineDto, description: '루틴 생성 정보' })
  @ApiResponse({ status: 201, description: '성공', type: RoutineDto })
  async createRoutine(
    @Param('userId') userId: string,
    @Body() createRoutineDto: CreateRoutineDto
  ) {
    return this.routineService.createRoutine(userId, createRoutineDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '사용자의 루틴 조회', description: '특정 사용자의 모든 루틴을 조회합니다.' })
  @ApiParam({ name: 'userId', required: true, description: '사용자의 ID' })
  @ApiResponse({ status: 200, description: '성공', type: [RoutineDto] })
  async getRoutineByUser(@Param('userId') userId: string) {
    return this.routineService.getRoutineByUser(userId);
  }
}
