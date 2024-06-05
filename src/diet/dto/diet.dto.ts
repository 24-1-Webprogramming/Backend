import { ApiProperty } from "@nestjs/swagger";

export class dietDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    diet_name: string;
    @ApiProperty()
    diet_type: string;
    @ApiProperty()
    calories: number;
    @ApiProperty()
    carbohydrate: number;
    @ApiProperty()
    protein: number;
    @ApiProperty()
    fat: number;
    @ApiProperty()
    log_date: Date;
}

export class getDietDto {
    @ApiProperty()
    diet_id: number;
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    diet_name: string;
    @ApiProperty()
    diet_type: string;
    @ApiProperty()
    calories: number;
    @ApiProperty()
    carbohydrate: number;
    @ApiProperty()
    protein: number;
    @ApiProperty()
    fat: number;
    @ApiProperty()
    log_date: Date;
}

export class createDietDto {
    @ApiProperty()
    diet_name: string;
    @ApiProperty()
    diet_type: string;
    @ApiProperty()
    calories: number;
    @ApiProperty()
    carbohydrate: number;
    @ApiProperty()
    protein: number;
    @ApiProperty()
    fat: number;
    @ApiProperty()
    log_date: Date;
}

