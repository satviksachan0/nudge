import { Test, TestingModule } from '@nestjs/testing';
import { ReminderProposalController } from './reminder-proposal.controller';

describe('ReminderProposalController', () => {
  let controller: ReminderProposalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReminderProposalController],
    }).compile();

    controller = module.get<ReminderProposalController>(ReminderProposalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
