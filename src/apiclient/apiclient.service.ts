import { HttpStatus, Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { CreateRepoDto } from './dto/createRepo.dto';
import {
  ErrorResponseDto,
  OctokitErrorResponseDto,
} from '../util-dto/errors.dto';
@Injectable()
export class ApiclientService {
  async createRepository(data: CreateRepoDto) {
    const octokit = new Octokit({
      auth: data.access_token,
    });
    try {
      return await octokit.repos.createUsingTemplate({
        template_owner: 'parthlaw',
        template_repo: 'ondc_backend',
        name: data.name,
      });
    } catch (e) {
      if (e.response) {
        const data = e.response.data as any;
        throw new OctokitErrorResponseDto(
          data.message,
          e.response.status,
          data.errors[0],
          data.documentation_url,
        );
      }
      throw new ErrorResponseDto(
        'Error in creating repository',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error in creating repository',
      );
    }
  }
  async getRepo(access_token: string, query: string, owner: string) {
    const octokit = new Octokit({
      auth: access_token,
    });
    try {
      return await octokit.repos.get({
        owner: owner,
        repo: query,
      });
    } catch (e) {
      if (e.response) {
        const data = e.response.data as any;
        throw new OctokitErrorResponseDto(
          data.message,
          e.response.status,
          '',
          data.documentation_url,
        );
      }
      throw new ErrorResponseDto(
        'Error in searching repositories',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error in searching repositories',
      );
    }
  }
  async getAllRepos(access_token: string) {
    const octokit = new Octokit({
      auth: access_token,
    });
    try {
      return await octokit.repos.listForAuthenticatedUser();
    } catch (e) {
      if (e.response) {
        const data = e.response.data as any;
        throw new OctokitErrorResponseDto(
          data.message,
          e.response.status,
          data.errors[0],
          data.documentation_url,
        );
      }
      throw new ErrorResponseDto(
        'Error in getting all repositories',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error in getting all repositories',
      );
    }
  }
}
