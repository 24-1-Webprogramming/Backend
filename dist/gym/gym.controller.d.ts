import { GymService } from './gym.service';
import { SearchGymDto } from './dto/gym.dto';
export declare class GymController {
    private readonly gymService;
    constructor(gymService: GymService);
    searchGymByLocal(body: SearchGymDto, res: any): Promise<void>;
}
