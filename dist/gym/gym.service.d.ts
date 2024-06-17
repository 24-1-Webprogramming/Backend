import { JwtService } from '@nestjs/jwt';
import { Gym } from 'src/entities/gyms.entity';
import { Repository } from 'typeorm';
import { SearchGymDto } from './dto/gym.dto';
import { Image_assets } from 'src/entities/image_assets.entity';
export declare class GymService {
    private readonly gymRepository;
    private readonly image_assetsRepository;
    private jwtService;
    constructor(gymRepository: Repository<Gym>, image_assetsRepository: Repository<Image_assets>, jwtService: JwtService);
    findByLocal(local: SearchGymDto): Promise<Gym[]>;
}
