import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { OauthService } from 'src/oauth/oauth.service';
import { JwtService } from 'src/jwt/jwt.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private oauthService: OauthService,
    private jwtservice: JwtService,
  ) {}
  async login(createUserDto: CreateUserDto) {
    try {
      const response = await this.oauthService.getGithubData(
        createUserDto.code,
      );
      let user: User;
      if (response.isValid) {
        user = await this.userRepository.findOne({
          where: { email: response.user.email },
        });
        if (user) {
          user.access_token = response.user.access_token;
          await this.userRepository.save(user);
        } else {
          user = await this.userRepository.save({
            name: response.user.name,
            email: response.user.email,
            profile_pic: response.user.profile_pic,
            access_token: response.user.access_token,
          });
        }
        const token = this.jwtservice.createToken(user.id);
        return {
          user,
          token,
        };
      } else {
        throw new HttpException('Invalid code', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
