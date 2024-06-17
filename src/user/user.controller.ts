import { Controller, Put, Delete, Param, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':userId')
  async updateUserProfile(
    @Param('userId') userId: number,
    @Body() body: { nickname: string, profile: string },
  ) {
    const { nickname, profile } = body;
    return this.userService.updateUserProfile(userId, nickname, profile);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number) {
    return this.userService.deleteUser(userId);
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: number) {
    return this.userService.getUserById(userId);
  }

  @Put('first-login/:userId')
  async updateFirstLoginStatus(@Param('userId') userId: number) {
    return this.userService.updateFirstLoginStatus(userId);
  }
}
