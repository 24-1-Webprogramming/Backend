import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineController } from './routine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from 'src/entities/routine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine])
  ],
  providers: [RoutineService],
  controllers: [RoutineController]
})
export class RoutineModule {}
