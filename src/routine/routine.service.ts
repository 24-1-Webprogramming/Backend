import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { Routine } from 'src/entities/routine.entity';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
  ) {}

  async getRoutineByUser(userId: string): Promise<Routine[]> {
    return this.routineRepository.find({ where: { user: { user_id: userId } } });
  }

  async createRoutine(userId: string, createRoutineDto: CreateRoutineDto): Promise<Routine> {
    const newRoutine = this.routineRepository.create({
      ...createRoutineDto,
      exercise: JSON.stringify(createRoutineDto.exercises),
      user: { user_id: userId }
    });
    return this.routineRepository.save(newRoutine);
  }
}