import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  github_id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  profile_pic: string;
}
export class UserLoginDto {
  @ApiProperty()
  user: UserResponseDto;
  @ApiProperty()
  token: string;
}
