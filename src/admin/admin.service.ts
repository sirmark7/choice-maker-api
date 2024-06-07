import {
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const adminExists = await this.findOneByStuffId(createAdminDto.staffId);
      if (adminExists) {
        throw new ConflictException('Admin Exists');
      }
      if (!createAdminDto.password || !createAdminDto.staffId) {
        throw new RequestTimeoutException('Password is required');
      }

      if (createAdminDto.password) {
        const hashedPassword = await hash(createAdminDto.password, 10);
        createAdminDto.password = hashedPassword;
        createAdminDto.verified = true;
      }

      const formatUser = this.adminRepository.create(createAdminDto);
      const result = await this.adminRepository.save(formatUser);

      return result;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const result = await this.adminRepository.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.adminRepository.findOne({ where: { id } });
      return result;
    } catch (error) {
      return error;
    }
  }
  async findOneByStuffId(stuffId: string) {
    try {
      const result = await this.adminRepository.findOne({
        where: { stuff_id: stuffId },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const adminExists = await this.findOne(id);
      if (!adminExists.id) {
        throw new NotFoundException('Admin does not Exists');
      }

      const updatedAdmin = this.adminRepository.merge(
        adminExists,
        updateAdminDto,
      );
      const result = await this.adminRepository.save(updatedAdmin);

      return result;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const adminExists = await this.findOne(id);
      if (!adminExists.id) {
        throw new NotFoundException('Admin does not Exists');
      }
      const result = await this.adminRepository.remove(adminExists);

      return result;
    } catch (error) {
      return error;
    }
  }
}
