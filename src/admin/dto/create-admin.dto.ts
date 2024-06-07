import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAdminDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'Name',
    type: String,
    required: true,
    example: 'john doe',
    description: 'admins full name ',
  })
  name: string;

  @ApiProperty({
    name: 'Stuff ID',
    type: String,
    required: true,
    example: 'GRE-272272@',
    description: 'admins stuff id',
  })
  staffId: string;

  @ApiProperty({
    name: 'Password',
    type: String,
    required: true,
    example: 'GRE-2722727',
    description: 'voters password ',
  })
  password: string;

  @ApiProperty({
    name: 'Picture',
    type: String,
    required: false,
    example: 'user.jpg',
    description: 'voters profile picture ',
  })
  picture?: string;
  verified: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
