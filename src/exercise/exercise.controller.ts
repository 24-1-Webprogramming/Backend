import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseService } from './exercise.service';
import { MainPageDataDto } from 'src/auth/dto/main-page-data.dto';

@ApiTags('exercise API')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('main/:userId')
  @ApiOperation({ summary: '메인 페이지 데이터 가져오기', description: '사용자의 메인 페이지 데이터를 가져옵니다.' })
  @ApiParam({ name: 'userId', required: true, description: '사용자의 ID' })
  @ApiResponse({ status: 200, description: '성공', type: MainPageDataDto })
  async getMainPageData(@Param('userId') userId: string): Promise<MainPageDataDto> {
    return this.exerciseService.getMainPageData(userId);
  }
}
