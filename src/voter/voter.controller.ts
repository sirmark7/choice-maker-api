import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoterService } from './voter.service';
import { CreateVoterDto } from './dto/create-voter.dto';
import { UpdateVoterDto } from './dto/update-voter.dto';

@Controller('voter')
export class VoterController {
  constructor(private readonly voterService: VoterService) {}

  @Post()
  create(@Body() createVoterDto: CreateVoterDto) {
    return this.voterService.create(createVoterDto);
  }

  @Get()
  findAll() {
    return this.voterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoterDto: UpdateVoterDto) {
    return this.voterService.update(+id, updateVoterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voterService.remove(+id);
  }
}
