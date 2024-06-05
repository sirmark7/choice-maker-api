import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthDto {
  @IsEmail()
  @ApiProperty({
    name: 'userID',
    type: String,
    required: true,
    example: 'GRE-2722727',
    description: 'users ID ',
  })
  userid: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    example: 'akndc;kd;ncdwnc',
    description: "user's password",
  })
  password: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
