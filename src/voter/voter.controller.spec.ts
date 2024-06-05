import { Test, TestingModule } from '@nestjs/testing';
import { VoterController } from './voter.controller';
import { VoterService } from './voter.service';

describe('VoterController', () => {
  let controller: VoterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoterController],
      providers: [VoterService],
    }).compile();

    controller = module.get<VoterController>(VoterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
