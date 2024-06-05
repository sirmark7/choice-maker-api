import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'Alias',
    type: String,
    required: false,
    example: 'SP',
    description: 'Category alias',
  })
  alias?: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'Category Name',
    type: String,
    required: true,
    example: 'Senior prefect',
    description: 'Category Name ',
  })
  categoryName: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
