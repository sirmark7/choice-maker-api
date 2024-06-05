import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateVoteDto {
  id: number;
  @IsNotEmpty()
  @ApiProperty({
    name: 'votes',
    type: Number,
    required: true,
    example: 290,
    description: 'candidates votes count ',
  })
  votes: number;
  
  @IsNotEmpty()
  @ApiProperty({
    name: 'Candidate user ID',
    type: Number,
    required: true,
    example: 'GRE-2722727',
    description: 'users ID ',
  })
  candidateId: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
