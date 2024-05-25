import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { DietService } from './diet.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { User_diets } from 'src/entities/user_diets.entity';
import { JwtServiceAuthGuard } from 'src/auth/guards/jwt-service.guard';
import { createDietDto, dietDto } from './dto/diet.dto';
import { FindDietDto } from './dto/find-diet.dto';

@Controller('diet')
export class DietController {
    constructor(
        private dietService: DietService
    ){}
    @ApiOperation({summary: 'set data', description: 'set user_diets'})
    @Post("setDiet")
    @ApiBody({type: createDietDto})
    @UseGuards(JwtServiceAuthGuard)
    async setDiet(@Body() body, @Req() req, @Res() res){
        let data: dietDto = body;
        data.user_id = await this.dietService.getUserId(req);
        await this.dietService.saveData(data);
        res.status(200).json({
            status: 200,
            info: "create new diet"
        });
    }

    @Post("findWithDay")
    @ApiBody({type: FindDietDto})
    @UseGuards(JwtServiceAuthGuard)
    async findWithDay(@Body() body, @Req() req){
        let diets = await this.dietService.findWithDay(body.log_date, req);
        return diets;
    }

    @Post("findAll")
    @UseGuards(JwtServiceAuthGuard)
    async findAll(@Req() req){
        let diets = await this.dietService.findAll(req);
        return diets;
    }

    
}
