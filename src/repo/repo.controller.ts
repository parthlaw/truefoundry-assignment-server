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

@UseGuards(AuthGuard)
@Controller('repo')
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Post()
  create(@Body() createRepoDto: CreateRepoDto, @Req() req: any) {
    return this.repoService.create(createRepoDto, req['user'].access_token);
  }

  @Get()
  async findOne(@Query('name') name: string, @Req() req: any) {
    return await this.repoService.findOne(
      name,
      req['user'].name,
      req['user'].access_token,
    );
  }
}
