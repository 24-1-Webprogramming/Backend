import { Injectable } from '@nestjs/common';

@Injectable()
export class WeightService {
  async createWeight(userId: string, weight: number): Promise<void> {
    // 체중 기록 생성 로직을 여기에 구현
  }
}
