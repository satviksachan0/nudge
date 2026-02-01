import { Test, TestingModule } from '@nestjs/testing';
import { ReminderRuleController } from './reminder-rule.controller';

describe('ReminderRuleController', () => {
  let controller: ReminderRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReminderRuleController],
    }).compile();

    controller = module.get<ReminderRuleController>(ReminderRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
