import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weight } from './weight.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class WeightService {
  constructor(
    @InjectRepository(Weight)
    private readonly weightRepository: Repository<Weight>,
  ) {}

  async createWeight(userId: number, weight: number): Promise<Weight> {
    const newWeight = this.weightRepository.create({ weight, user: { id: userId } });
    return this.weightRepository.save(newWeight);
  }
}
