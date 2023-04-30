import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@WebSocketGateway()
export class GuestGateway {
  constructor(private readonly guestService: GuestService) {}

  @SubscribeMessage('createGuest')
  create(@MessageBody() createGuestDto: CreateGuestDto) {
    return this.guestService.create(createGuestDto);
  }

  @SubscribeMessage('findAllGuest')
  findAll() {
    return this.guestService.findAll();
  }

  @SubscribeMessage('findOneGuest')
  findOne(@MessageBody() id: number) {
    return this.guestService.findOne(id);
  }

  @SubscribeMessage('updateGuest')
  update(@MessageBody() updateGuestDto: UpdateGuestDto) {
    return this.guestService.update(updateGuestDto.id, updateGuestDto);
  }

  @SubscribeMessage('removeGuest')
  remove(@MessageBody() id: number) {
    return this.guestService.remove(id);
  }
}
