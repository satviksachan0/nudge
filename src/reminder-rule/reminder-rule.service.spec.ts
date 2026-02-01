import { Test, TestingModule } from '@nestjs/testing';
import { ReminderRuleService } from './reminder-rule.service';

describe('ReminderRuleService', () => {
  let service: ReminderRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReminderRuleService],
    }).compile();

    service = module.get<ReminderRuleService>(ReminderRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
