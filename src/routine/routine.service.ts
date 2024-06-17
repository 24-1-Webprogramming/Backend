import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routine } from 'src/entities/routine.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
  ) {}

  async getRoutineByUser(userId: number): Promise<Routine[]> {
    return this.routineRepository.find({ where: { user: { id: userId } } });
  }

  async createRoutine(userId: number, createRoutineDto: CreateRoutineDto): Promise<Routine> {
    const newRoutine = this.routineRepository.create({
      ...createRoutineDto,
      exercises: JSON.stringify(createRoutineDto.exercises),
      user: { id: userId }
    });
    return this.routineRepository.save(newRoutine);
  }
}
