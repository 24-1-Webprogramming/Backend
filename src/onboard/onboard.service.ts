import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Onboard_conditions } from 'src/entities/onboard_conditions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OnboardService {
    constructor(
        @InjectRepository(Onboard_conditions)
        private readonly onboardRepository: Repository<Onboard_conditions>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ){}
    /**
     * @param req 객체
     * @return JSON Onboard_conditions
     */
    async findOnboard(req: Request){
        let token: string = req.headers['authorization'].replace('Bearer ', '');
        const decodedToken = this.jwtService.verify(token, {secret: this.configService.get('SECRET_KEY')});
        let onboard = await this.onboardRepository.findOne({where: {user_id: decodedToken.id}});
        return onboard;
    }
    /**
     * 
     * @param data 넣을 데이터
     * @returns 그냥 저장함요~
     */
    async saveData(data: Onboard_conditions) {
        return await this.onboardRepository.save(data);
    }
    /**
     * 
     * @param data 지울 데이터 (Onboard_conditions)
     * @returns 그냥 지움요~
     */
    async deleteData(data: Onboard_conditions) {
        return await this.onboardRepository.delete({user_id: data.user_id})
    }
}
