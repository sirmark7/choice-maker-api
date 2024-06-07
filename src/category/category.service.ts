import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      if (!createCategoryDto.categoryName) {
        throw new ConflictException('Category Exists');
      }

      const formated = this.categoryRepository.create(createCategoryDto);
      const result = await this.categoryRepository.save(formated);

      return result;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const result = await this.categoryRepository.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.categoryRepository.findOne({ where: { id } });
      return result;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const categoryExists = await this.findOne(id);
      if (!categoryExists.id) {
        throw new NotFoundException('Candidate does not Exists');
      }

      const updatedAdmin = this.categoryRepository.merge(
        categoryExists,
        updateCategoryDto,
      );
      const result = await this.categoryRepository.save(updatedAdmin);

      return result;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const categoryExists = await this.findOne(id);
      if (!categoryExists.id) {
        throw new NotFoundException('Admin does not Exists');
      }
      const result = await this.categoryRepository.remove(categoryExists);

      return result;
    } catch (error) {
      return error;
    }
  }
}
