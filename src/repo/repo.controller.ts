import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { RepoService } from './repo.service';
import { CreateRepoDto } from './dto/create-repo.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateRepoResponseDto } from './dto/create-response.dto';

@UseGuards(AuthGuard)
@Controller('repo')
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateRepoResponseDto })
  create(@Body() createRepoDto: CreateRepoDto, @Req() req: any) {
    return this.repoService.create(createRepoDto, req['user'].access_token);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CreateRepoResponseDto })
  async findOne(@Query('name') name: string, @Req() req: any) {
    return await this.repoService.findOne(
      name,
      req['user'].name,
      req['user'].access_token,
    );
  }
}
