import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ExerciseRecordService } from './exercise-record.service';
import { ExerciseRecordDto } from './dto/exercise-record.dto';

@ApiTags('exercise-record API')
@Controller('exercise-record')
export class ExerciseRecordController {
  constructor(private readonly exerciseRecordService: ExerciseRecordService) {}

  @Post(':userId')
  @ApiOperation({ summary: '운동 기록 생성', description: '특정 사용자의 운동 기록을 생성합니다.' })
  @ApiParam({ name: 'userId', required: true, description: '사용자의 ID' })
  @ApiBody({ type: ExerciseRecordDto, description: '운동 기록 생성 정보' })
  @ApiResponse({ status: 201, description: '운동 기록이 성공적으로 생성되었습니다.', type: ExerciseRecordDto })
  async createRecord(
    @Param('userId') userId: string,
    @Body() createExerciseRecordDto: ExerciseRecordDto
  ): Promise<ExerciseRecordDto> {
    return this.exerciseRecordService.createRecord(userId, createExerciseRecordDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: '사용자의 운동 기록 조회', description: '특정 사용자의 모든 운동 기록을 조회합니다.' })
  @ApiParam({ name: 'userId', required: true, description: '사용자의 ID' })
  @ApiResponse({ status: 200, description: '운동 기록 조회 성공', type: [ExerciseRecordDto] })
  async getRecordsByUser(@Param('userId') userId: string): Promise<ExerciseRecordDto[]> {
    return this.exerciseRecordService.getRecordsByUser(userId);
  }
}
