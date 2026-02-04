import { Test, TestingModule } from '@nestjs/testing';
import { ReminderSenderService } from './reminder-sender.service';

describe('ReminderSenderService', () => {
  let service: ReminderSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReminderSenderService],
    }).compile();

    service = module.get<ReminderSenderService>(ReminderSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
