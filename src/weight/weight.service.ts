import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weight } from 'src/entities/weight.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeightService {
  constructor(
    @InjectRepository(Weight)
    private readonly weightRepository: Repository<Weight>,
  ) {}

  async createWeight(userId: string, weight: number): Promise<Weight> {
    const newWeight = this.weightRepository.create({ weight, user: { user_id: userId } });
    return this.weightRepository.save(newWeight);
  }
}