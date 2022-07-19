import { Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { RepoController } from './repo.controller';
import { JwtService } from '../jwt/jwt.service';
import { ApiclientService } from '../apiclient/apiclient.service';

@Module({
  controllers: [RepoController],
  providers: [RepoService, JwtService, ApiclientService],
})
export class RepoModule {}
