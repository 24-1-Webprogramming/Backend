import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gym } from '../entities/gym.entity';
import { CreateGymDto } from './dto/create-gym.dto';

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,
  ) {}

  async createGym(createGymDto: CreateGymDto): Promise<Gym> {
    const newGym = this.gymRepository.create(createGymDto);
    return this.gymRepository.save(newGym);
  }

  async getGyms(): Promise<Gym[]> {
    return this.gymRepository.find();
  }

  async getGymById(gymId: number): Promise<Gym> {
    return this.gymRepository.findOne({ where: { id: gymId } });
  }

  async getGymsByLocation(latitude: number, longitude: number): Promise<Gym[]> {
    // You can implement a more sophisticated location-based search here
    return this.gymRepository.find();
  }
}
