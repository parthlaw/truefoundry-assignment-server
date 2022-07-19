import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtService {
  //   constructor() {}
  createToken(userId: number) {
    return jwt.sign({ user_id: userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
