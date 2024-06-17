import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Onboard_conditions } from 'src/entities/onboard_conditions.entity';
import { Repository } from 'typeorm';
export declare class OnboardService {
    private readonly onboardRepository;
    private readonly configService;
    private readonly jwtService;
    constructor(onboardRepository: Repository<Onboard_conditions>, configService: ConfigService, jwtService: JwtService);
    findOnboard(req: Request): Promise<Onboard_conditions>;
    saveData(data: Onboard_conditions): Promise<Onboard_conditions>;
    deleteData(data: Onboard_conditions): Promise<import("typeorm").DeleteResult>;
}
