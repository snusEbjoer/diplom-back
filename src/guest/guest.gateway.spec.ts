import { Test, TestingModule } from '@nestjs/testing';
import { GuestGateway } from './guest.gateway';
import { GuestService } from './guest.service';

describe('GuestGateway', () => {
  let gateway: GuestGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestGateway, GuestService],
    }).compile();

    gateway = module.get<GuestGateway>(GuestGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
