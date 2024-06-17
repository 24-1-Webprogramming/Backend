import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dday } from '../entities/dday.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class DdayService {
  constructor(
    @InjectRepository(Dday)
    private readonly ddayRepository: Repository<Dday>,
  ) {}

  async createDday(userId: number, title: string, date: Date, goal: string): Promise<Dday> {
    const newDday = this.ddayRepository.create({ title, date, goal, user: { id: userId } });
    return this.ddayRepository.save(newDday);
  }
}
