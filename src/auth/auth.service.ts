import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';


@Injectable()
export class AuthService {
  create(createAuthDto: AuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: AuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
