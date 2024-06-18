import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ExerciseCompletionService } from './exercise-completion.service';
import { CreateExerciseCompletionDto } from './dto/create-exercise-completion.dto';
import { ExerciseCompletionDto } from './dto/exercise-completion.dto';

@ApiTags('exercise-completion API')
@Controller('exercise-completion')
export class ExerciseCompletionController {
  constructor(private readonly exerciseCompletionService: ExerciseCompletionService) {}

  @Post(':userId')
  @ApiOperation({ summary: '운동 완료 기록 생성', description: '특정 사용자의 운동 완료 기록을 생성합니다.' })
  @ApiParam({ name: 'userId', required: true, description: '사용자의 ID' })
  @ApiBody({ type: CreateExerciseCompletionDto, description: '운동 완료 기록 생성 정보' })
  @ApiResponse({ status: 201, description: '운동 완료 기록이 성공적으로 생성되었습니다.', type: ExerciseCompletionDto })
  async completeExercise(
    @Param('userId') userId: string,
    @Body() createExerciseCompletionDto: CreateExerciseCompletionDto
  ): Promise<ExerciseCompletionDto> {
    return this.exerciseCompletionService.completeExercise(userId, createExerciseCompletionDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: '사용자의 운동 완료 기록 조회', description: '특정 사용자의 모든 운동 완료 기록을 조회합니다.' })
  @ApiParam({ name: 'userId', required: true, description: '사용자의 ID' })
  @ApiResponse({ status: 200, description: '운동 완료 기록 조회 성공', type: [ExerciseCompletionDto] })
  async getCompletionsByUser(@Param('userId') userId: string): Promise<ExerciseCompletionDto[]> {
    return this.exerciseCompletionService.getCompletionsByUser(userId);
  }
}
