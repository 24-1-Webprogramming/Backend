export class dietDto {
    user_id: string;
    diet_name: string;
    diet_type: string;
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    log_date: Date;
}

export class getDietDto {
    diet_id: number;
    user_id: string;
    diet_name: string;
    diet_type: string;
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    log_date: Date;
}

export class createDietDto {
    diet_name: string;
    diet_type: string;
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    log_date: Date;
}

