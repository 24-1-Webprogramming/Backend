import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GymService } from './gym.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchGymDto } from './dto/gym.dto';

@ApiTags('gym API')
@Controller('gym')
export class GymController {
    constructor(
        private readonly gymService: GymService
    ) {}

    @Post('searchGymByLocal')
    @ApiOperation({summary: '헬스장 검색 AI', description: '해당 지역의 헬스장을 찾는다 ex) "상도동" '})
    @ApiBody({type: SearchGymDto})
    @ApiResponse({ status: 200, description: 'FOUND'})
    @ApiResponse({ status: 204, description: 'NOT_FOUND'})
    async searchGymByLocal(@Body() body: SearchGymDto, @Res() res) {
        let gymList = await this.gymService.findByLocal(body);
        res.status(HttpStatus.OK).json(gymList);
    }
}
