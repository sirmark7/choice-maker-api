import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateVoterDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'Name',
    type: String,
    required: true,
    example: 'john doe',
    description: 'Voters full name ',
  })
  name: string;

  @ApiProperty({
    name: 'Voter ID',
    type: String,
    required: true,
    example: 'GRE-272272@',
    description: 'voters voterid',
  })
  voterId: string;

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

  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
