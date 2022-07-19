import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OctokitErrorResponseDto } from 'src/util-dto/errors.dto';
import { ApiclientService } from '../apiclient/apiclient.service';
import { CreateRepoDto } from './dto/create-repo.dto';

@Injectable()
export class RepoService {
  constructor(private readonly apiClientService: ApiclientService) {}
  async create(createRepoDto: CreateRepoDto, access_token: string) {
    try {
      const data = await this.apiClientService.createRepository({
        name: createRepoDto.name,
        private: createRepoDto.private,
        access_token,
      });
      const response = {
        id: data.data.id,
        name: data.data.name,
        private: data.data.private,
        full_name: data.data.full_name,
        url: data.data.html_url,
      };
      return response;
    } catch (e) {
      if (e instanceof OctokitErrorResponseDto) {
        throw new HttpException(e.error, e.status);
      }
      return new HttpException(
        'Error in creating Repository',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOne(name: string, access_token: string) {
    try {
      const data = await this.apiClientService.getRepo(access_token, name);
      const response = {
        id: data.data.id,
        name: data.data.name,
        private: data.data.private,
        full_name: data.data.full_name,
        url: data.data.html_url,
      };
      return response;
    } catch (e) {
      if (e instanceof OctokitErrorResponseDto) {
        throw new HttpException(e.message, e.status);
      }
      return new HttpException(
        'Error in searching Repository',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
