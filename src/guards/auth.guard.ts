import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.cookies) request.cookies = {};
    if (!request.headers) request.headers = {};
    // Headers doesn't recognise uppercase characters
    const { authorization: accessTokenFromHeader } = request.headers;
    if (!accessTokenFromHeader) {
      return false;
    }
    try {
      const access_token = accessTokenFromHeader as string;
      const decoded = this.jwtService.verifyToken(access_token) as JwtPayload;
      const user = await this.userService.findOne(decoded.user_id);
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      request['user'] = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
