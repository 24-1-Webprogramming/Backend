import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Gym } from 'src/entities/gyms.entity';
import { Like, Repository } from 'typeorm';
import { SearchGymDto } from './dto/gym.dto';

@Injectable()
export class GymService {
    constructor(
        @InjectRepository(Gym)
        private readonly gymRepository: Repository<Gym>,
        private jwtService: JwtService
    ) {}

    async findByLocal(local: SearchGymDto){
        const gymList = await this.gymRepository.createQueryBuilder('gym')
        .where('gym.address LIKE :address', { address: `%${local.address}%` })
        .getMany();
        
        //let gymList = await this.gymRepository.find({where: {address: Like(local.address)}})
        return gymList;
    }
}
