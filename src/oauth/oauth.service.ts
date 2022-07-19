import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OauthService {
  async getGithubData(code: string) {
    try {
      const response = {} as any;
      const accessTokenResponse = await axios.get(
        `https://github.com/login/oauth/access_token?code=${code}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      const token = accessTokenResponse.data;
      if (token.error) {
        return { isValid: false };
      }
      const userDataResponse = await axios.get(`https://api.github.com/user`, {
        headers: {
          Accept: 'application/json',
          Authorization: `token ${token.access_token}`,
        },
      });
      const userData = userDataResponse.data;
      response.isValid = true;
      response.user = {} as any;
      response.user.name = userData.name || userData.login || 'no name';
      response.user.github_id = userData.id;
      response.user.email = userData.email || 'no email';
      response.user.profile_pic = userData.avatar_url;
      response.user.access_token = token.access_token;
      return response;
    } catch (error) {
      return error;
    }
  }
}
