import {
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateVoterDto } from './dto/create-voter.dto';
import { UpdateVoterDto } from './dto/update-voter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voter } from './entities/voter.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class VoterService {
  constructor(
    @InjectRepository(Voter) private voterRepository: Repository<Voter>,
  ) {}

  async create(createVoterDto: CreateVoterDto) {
    try {
      const voterExists = await this.findOneByVoterId(createVoterDto.voterId);
      if (voterExists) {
        throw new ConflictException('Admin Exists');
      }
      if (!createVoterDto.password || !createVoterDto.voterId) {
        throw new RequestTimeoutException('Password is required');
      }


      if (createVoterDto.password) {
        const hashedPassword = await hash(createVoterDto.password, 10);
        createVoterDto.password = hashedPassword;
        createVoterDto.verified = true;
      }

      const formatUser = this.voterRepository.create(createVoterDto);
      const result = await this.voterRepository.save(formatUser);

      return result;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const result = await this.voterRepository.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.voterRepository.findOne({ where: { id } });
      return result;
    } catch (error) {
      return error;
    }
  }
  async findOneByVoterId(voterId: string) {
    try {
      const result = await this.voterRepository.findOne({
        where: { voter_id: voterId },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateVoterDto: UpdateVoterDto) {
    try {
      const voterExists = await this.findOne(id);
      if (!voterExists.id) {
        throw new NotFoundException('Voter does not Exists');
      }

      const updatedAdmin = this.voterRepository.merge(
        voterExists,
        updateVoterDto,
      );
      const result = await this.voterRepository.save(updatedAdmin);

      return result;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const voterExists = await this.findOne(id);
      if (!voterExists.id) {
        throw new NotFoundException('Admin does not Exists');
      }
      const result = await this.voterRepository.remove(voterExists);

      return result;
    } catch (error) {
      return error;
    }
  }
}
