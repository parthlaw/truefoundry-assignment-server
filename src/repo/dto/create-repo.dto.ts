import { ApiProperty } from '@nestjs/swagger';

export class CreateRepoDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  private: boolean;
}
