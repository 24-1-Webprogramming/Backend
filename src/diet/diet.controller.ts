import { Body, Controller, Delete, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { DietService } from './diet.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User_diets } from 'src/entities/user_diets.entity';
import { JwtServiceAuthGuard } from 'src/auth/guards/jwt-service.guard';
import { createDietDto, dietDto } from './dto/diet.dto';
import { FindDietDto, UserIdDto } from './dto/find-diet.dto';
import { DeleteDieWithIdtDto, DeleteDieWithTypeDto } from './dto/delete-diet.dto';
import { JwtStrategy } from 'src/auth/strategies/newStrategy.strategy';

@ApiTags('diet API')
@Controller('diet')
export class DietController {
    constructor(
        private dietService: DietService
    ){}
    
    @ApiBearerAuth()
    @ApiOperation({summary: '식단 등록', description: '새로운 식단을 등록한다 만약 존재한다면 덮어쓴다'})
    @ApiResponse({ 
        status: 200, 
        description: 'success',
        type: String
    })
    @ApiBody({type: dietDto})
    @Post("setDiet")
    async setDiet(@Body() body: dietDto, @Res() res){
        let data: dietDto = body;
        await this.dietService.saveData(data);
        res.status(HttpStatus.CREATED).json({
            info: "create new diet"
        });
    }

    @ApiBearerAuth()
    @Post("findWithDay")
    @ApiResponse({ 
        status: 302,
        description: 'success',
        type: dietDto
    })
    @ApiResponse({ 
        status: 204,
        description: 'no diets'
    })
    @ApiOperation({summary: '식단 검색 (날짜)', description: '해당 사용자가 해당 날짜에 등록해둔 식단을 반환한다'})
    @ApiBody({type: FindDietDto})
    async findWithDay(@Body() body: FindDietDto, @Res() res){
        let diets = await this.dietService.findWithDay(body);
        if (diets.length == 0){ res.status(HttpStatus.NO_CONTENT).json(); }
        res.status(HttpStatus.FOUND).json(diets);
    }

    @ApiBearerAuth()
    @Post("findAll")
    @ApiResponse({ 
        status: 302,
        description: 'success *결과는 리스트로 출력됩니다*',
        type: dietDto
    })
    @ApiOperation({summary: '식단 검색 (전체)', description: '해당 사용자의 모든 식단을 반환한다'})
    async findAll(@Body() body: UserIdDto, @Res() res){
        let diets = await this.dietService.findAll(body);
        if (diets.length == 0) { res.status(HttpStatus.NO_CONTENT).json(); }
        res.status(HttpStatus.FOUND).json(diets);
    }

    @ApiBearerAuth()
    @Delete("deleteWithId")
    @ApiOperation({summary: '식단 정보 삭제 (id)', description: '해당 id를 가진 식단 record를 삭제한다.'})
    @ApiBody({type: DeleteDieWithIdtDto})
    async deleteWithId(@Body() body: DeleteDieWithIdtDto, @Res() res){
        await this.dietService.deleteDietWithId(body);
        res.status(HttpStatus.OK).json({
            info: "deleted"
        });
    }

    @ApiBearerAuth()
    @Delete("deleteWithType")
    @ApiOperation({summary: '식단 검색 (날짜, 종류)', description: '해당 사용자가 해당 날짜에 등록해둔 해당 종류의 식단을 삭제한다.'})
    @ApiBody({type: DeleteDieWithTypeDto})
    async deleteWithType(@Body() body: DeleteDieWithTypeDto, @Res() res){
        let ans = await this.dietService.deleteDietWithType(body);
        if (ans == null) {
            res.status(HttpStatus.NO_CONTENT).json({info: "failed"})
        }
        else{
            res.status(HttpStatus.OK).json({
                info: "deleted"
            })
        }
    }
}
