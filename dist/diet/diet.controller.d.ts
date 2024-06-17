import { DietService } from './diet.service';
import { dietDto } from './dto/diet.dto';
import { FindDietDto } from './dto/find-diet.dto';
import { DeleteDieWithIdtDto, DeleteDieWithTypeDto } from './dto/delete-diet.dto';
export declare class DietController {
    private dietService;
    constructor(dietService: DietService);
    setDiet(body: dietDto, req: any, res: any): Promise<void>;
    findWithDay(body: FindDietDto, req: any, res: any): Promise<void>;
    findAll(req: any, res: any): Promise<void>;
    deleteWithId(body: DeleteDieWithIdtDto, req: any, res: any): Promise<void>;
    deleteWithType(body: DeleteDieWithTypeDto, req: any, res: any): Promise<void>;
}
