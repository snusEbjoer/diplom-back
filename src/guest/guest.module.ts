import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestGateway } from './guest.gateway';

@Module({
  providers: [GuestGateway, GuestService]
})
export class GuestModule {}
