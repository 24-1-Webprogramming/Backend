import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User_diets } from 'src/entities/user_diets.entity';
import { Repository } from 'typeorm';
import { dietDto } from './dto/diet.dto';
import { DeleteDieWithTypeDto } from './dto/delete-diet.dto';
export declare class DietService {
    private readonly user_dietRepository;
    private readonly configService;
    private readonly jwtService;
    constructor(user_dietRepository: Repository<User_diets>, configService: ConfigService, jwtService: JwtService);
    findWithDay(day: Date, req: Request): Promise<User_diets[]>;
    findAll(req: Request): Promise<User_diets[]>;
    saveData(data: dietDto): Promise<dietDto & User_diets>;
    getUserId(req: Request): Promise<any>;
    deleteDietWithId(id: number): Promise<import("typeorm").DeleteResult>;
    deleteDietWithType(data: DeleteDieWithTypeDto, req: Request): Promise<import("typeorm").DeleteResult>;
}
