import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto) {
    try {
      if (!createCandidateDto.userId) {
        throw new ConflictException('Candidate Exists');
      }

      const formatUser = this.candidateRepository.create(createCandidateDto);
      const result = await this.candidateRepository.save(formatUser);

      return result;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const result = await this.candidateRepository.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.candidateRepository.findOne({ where: { id } });
      return result;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    try {
      const candidateExists = await this.findOne(id);
      if (!candidateExists.id) {
        throw new NotFoundException('Candidate does not Exists');
      }

      const updatedAdmin = this.candidateRepository.merge(
        candidateExists,
        updateCandidateDto,
      );
      const result = await this.candidateRepository.save(updatedAdmin);

      return result;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const candidateExists = await this.findOne(id);
      if (!candidateExists.id) {
        throw new NotFoundException('Admin does not Exists');
      }
      const result = await this.candidateRepository.remove(candidateExists);

      return result;
    } catch (error) {
      return error;
    }
  }
}
