import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserLoginDto, UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: UserLoginDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.login(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserResponseDto })
  findOne(@Req() req: any) {
    return this.userService.findOne(req['user'].id);
  }
}
