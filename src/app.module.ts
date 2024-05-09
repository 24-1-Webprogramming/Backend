//import defaults
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
//필요 파일 import
import { UsersModule } from './users/users.module';
import { User } from './database/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",//"3.38.212.126",
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'WPservice',
      entities: [User],
      //synchronize: false,
      //logging: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
