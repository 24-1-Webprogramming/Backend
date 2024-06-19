import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/entities/groups.entity';
import { GroupMember } from 'src/entities/group_members.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceStrategy } from 'src/auth/strategies/jwt-service.strategy';
import { Users } from 'src/entities/users.entity';
import { Stat } from 'src/entities/user_stats.entity';
import { JwtStrategy } from 'src/auth/strategies/newStrategy.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Group, GroupMember, Stat]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: {expiresIn: '5m'}
        };
      },
      inject: [ConfigService]
    })
  ],
  controllers: [GroupController],
  providers: [GroupService, JwtServiceStrategy, JwtStrategy],
  exports: [GroupModule]
})
export class GroupModule {}
