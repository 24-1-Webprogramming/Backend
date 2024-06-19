import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User_diets } from 'src/entities/user_diets.entity';
import { Repository } from 'typeorm';
import { dietDto } from './dto/diet.dto';
import { DeleteDieWithIdtDto, DeleteDieWithTypeDto } from './dto/delete-diet.dto';
import { FindDietDto, UserIdDto } from './dto/find-diet.dto';

@Injectable()
export class DietService {
    constructor(
        @InjectRepository(User_diets)
        private readonly user_dietRepository: Repository<User_diets>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ){}
    async findWithDay(day: FindDietDto){
        let diets = await this.user_dietRepository.find({where: {user_id: day.user_id, log_date: day.log_date}});
        return diets;
    }
    async findAll(data: UserIdDto){
        let diets = await this.user_dietRepository.find({where: {user_id: data.user_id}});
        return diets;
    }
    async saveData(data: dietDto){
        return await this.user_dietRepository.save(data);
    }
    async getUserId(req: Request){
        let token: string = req.headers['authorization'].replace('Bearer ', '');
        const decodedToken = this.jwtService.verify(token, {secret: this.configService.get('SECRET_KEY')});
        return decodedToken.id;
    }
    async deleteDietWithId(data: DeleteDieWithIdtDto){
        return await this.user_dietRepository.delete({diet_id: data.id})
    }

    async deleteDietWithType(data: DeleteDieWithTypeDto){
        let diet = await this.user_dietRepository.findOne({where: {user_id: data.user_id, diet_type: data.diet_type, log_date: data.log_date}})
        console.log(diet)
        if (diet == null) { return null }
        return await this.deleteDietWithId({id: diet.diet_id} as DeleteDieWithIdtDto);
    }
    
    async getUser(data: string){
        return await this.user_dietRepository.findOne({where: {user_id: data}});
    }
}
