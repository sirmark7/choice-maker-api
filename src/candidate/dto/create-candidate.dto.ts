import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCandidateDto {
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    name: 'Candidate user ID',
    type: Number,
    required: true,
    example: 'GRE-2722727',
    description: 'users ID ',
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    name: 'Candidate position',
    type: String,
    required: true,
    example: 'senoir prefect',
    description: 'position candidate is contesting for ',
  })
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    name: 'votes',
    type: Number,
    required: true,
    example: 234,
    description: 'candidate votes',
  })
  votes: number;

  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
