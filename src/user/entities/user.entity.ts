import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  github_id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  access_token: string;
  @Column()
  profile_pic: string;
}
