import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RepoModule } from './repo/repo.module';
import { ApiclientService } from './apiclient/apiclient.service';
import { OauthService } from './oauth/oauth.service';
import { JwtService } from './jwt/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    RepoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ApiclientService, OauthService, JwtService],
})
export class AppModule {}
