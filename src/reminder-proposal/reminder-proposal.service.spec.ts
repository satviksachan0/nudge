import { Test, TestingModule } from '@nestjs/testing';
import { ReminderProposalService } from './reminder-proposal.service';

describe('ReminderProposalService', () => {
  let service: ReminderProposalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReminderProposalService],
    }).compile();

    service = module.get<ReminderProposalService>(ReminderProposalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
