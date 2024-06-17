import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateUserProfile(userId: number, nickname: string, profile: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.nickname = nickname;
    user.profile = profile;
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async getUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async updateFirstLoginStatus(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.isFirstLogin = false;
      await this.userRepository.save(user);
    }
  }
}
