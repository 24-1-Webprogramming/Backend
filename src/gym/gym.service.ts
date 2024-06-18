import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Gym } from 'src/entities/gyms.entity';
import { Like, Repository } from 'typeorm';
import { SearchGymDto } from './dto/gym.dto';
import { Image_assets } from 'src/entities/image_assets.entity';
import { CreateGymDto } from './dto/create-gym.dto';

@Injectable()
export class GymService {
    constructor(
        @InjectRepository(Gym)
        private readonly gymRepository: Repository<Gym>,
        @InjectRepository(Image_assets)
        private readonly image_assetsRepository: Repository<Image_assets>,
        private jwtService: JwtService
    ) {}

    async findByLocal(local: SearchGymDto){
        const gymList = await this.gymRepository.createQueryBuilder('gym')
        .where('gym.address LIKE :address', { address: `%${local.address}%` })
        .getMany();
        
        let finalGymList = gymList;
        //let finalGymList = [];
        //for (let gym of gymList){
            //let gymdata = gym;
            //let image = await this.image_assetsRepository.findOne({where: {image_name: gym.image_path.replace("./image_assets/","").replace(".jpg","")}});
            //if (image == null) { gymdata['image'] = null; }
            //else { gymdata['image'] = image.image; }
            //finalGymList.push(gymdata);
        //}
        return finalGymList;
    }

    async createGym(createGymDto: CreateGymDto): Promise<Gym> {
        const newGym = this.gymRepository.create(createGymDto);
        return this.gymRepository.save(newGym);
    }
    
    async getGyms(): Promise<Gym[]> {
        return this.gymRepository.find();
    }
    
    async getGymById(gymId: number): Promise<Gym> {
        return this.gymRepository.findOne({ where: { gym_id: gymId } });
    }
    
    async getGymsByLocation(latitude: number, longitude: number): Promise<Gym[]> {
        // You can implement a more sophisticated location-based search here
        return this.gymRepository.find();
    }
}
