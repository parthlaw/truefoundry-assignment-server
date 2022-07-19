import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.login(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findOne(@Req() req: any) {
    return this.userService.findOne(req['user'].id);
  }
}
