import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OauthService } from '../oauth/oauth.service';
import { JwtService } from 'src/jwt/jwt.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, OauthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
