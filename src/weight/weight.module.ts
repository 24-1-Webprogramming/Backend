import { Module } from '@nestjs/common';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weight } from 'src/entities/weight.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weight])
  ],
  controllers: [WeightController],
  providers: [WeightService]
})
export class WeightModule {}
