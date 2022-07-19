import { ApiProperty } from '@nestjs/swagger';

export class CreateRepoResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  private: boolean;
  @ApiProperty()
  full_name: string;
  @ApiProperty()
  url: string;
}
