import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { PrismaService } from 'nestjs-prisma';
import { Server, Socket } from 'socket.io';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateGuestDto } from 'src/guest/dto/create-guest.dto';



@WebSocketGateway({ cors: '*:*' })
export class ConversationGateway {
  constructor(private readonly prisma: PrismaService) { }
  private rooms = new Map<string, CreateConversationDto>();

  @WebSocketServer()
  server: Server;

  
  @SubscribeMessage('sendMessage')
  handleNewMessage(@MessageBody() data: any) {
    // Broadcast a message to all users in the same room
    const room = this.getRoom(data.roomId);
    this.server.to(data.roomId).emit('newMessage', { user: data.user, message: data.message, room: room });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(@MessageBody() data: CreateConversationDto, client:Socket) {
    // Create a new room
    const room = await this.prisma.conversation.create({data: {
      agent_id:data.agent_id,
      guest_id:data.guest_id,
      finished:data.finished
    }});
    this.server.emit('roomCreated', room);
  }
  @SubscribeMessage('createGuest')
  async handleCreateGuest(@MessageBody() data: CreateGuestDto) {
    const guest = await this.prisma.guest.create({data:{
      ...data
    }})
    console.log(guest)
    this.server.emit('guestCreated', guest)
  }
  
  getRoom(roomId: string): CreateConversationDto {
    return this.rooms.get(roomId);
  }

  getAllRooms(): CreateConversationDto[] {
    return Array.from(this.rooms.values());
  }
}
