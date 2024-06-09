import { ApiProperty } from "@nestjs/swagger";

export class SearchGymDto {
    @ApiProperty()
    address: string
}

export class GymDto {
    @ApiProperty({ description: 'Gym ID' })
    gym_id: number;
  
    @ApiProperty({ description: 'Name of the gym' })
    name: string;
  
    @ApiProperty({ description: 'Address of the gym' })
    address: string;
  
    @ApiProperty({ description: 'Latitude of the gym location' })
    lat: number;
  
    @ApiProperty({ description: 'Longitude of the gym location' })
    lng: number;
  
    @ApiProperty({ description: 'Indicates if it is a one-day pass' })
    is_one_day: number;
  
    @ApiProperty({ description: 'Indicates if OT is free' })
    is_ot_free: number;
  
    @ApiProperty({ description: 'Indicates if Inbody is available' })
    is_inbody: number;
  
    @ApiProperty({ description: 'Price of the gym service' })
    price: number;
  
    @ApiProperty({ description: 'Type of the price' })
    price_type: string;
  
    @ApiProperty({ description: 'Image path for the gym' })
    image_path: string;
  }