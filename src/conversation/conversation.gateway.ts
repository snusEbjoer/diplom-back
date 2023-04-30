import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'nestjs-prisma';

interface ChatRoom {
  roomId: string;
  users: number;
}

@Injectable()
@WebSocketGateway()
export class ConversationGateway implements OnGatewayInit {
  constructor(private readonly prisma: PrismaService) { }
  @WebSocketServer() server: Server;

  private activeSockets: { [key: string]: Socket } = {};
  private chatRooms: ChatRoom[] = [];

  afterInit(server: any) {
    console.log('WebSocket server initialized');
  }

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
    this.activeSockets[socket.id] = socket;
    socket.emit('rooms', this.chatRooms);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
    delete this.activeSockets[socket.id];
  }
  
  @SubscribeMessage('join')
  handleJoinChat(client: Socket, roomId: string) {
    const room = this.chatRooms.find((r) => r.roomId === roomId);
    if (!room) {
      this.chatRooms.push({ roomId, users: 1 });
    } else if (room.users === 2) {
      client.emit('full');
      return;
    } else {
      room.users += 1;
    }
    client.join(roomId);
    this.server.to(roomId).emit('users', room.users);
  }

  @SubscribeMessage('leave')
  handleLeaveChat(client: Socket, roomId: string) {
    const room = this.chatRooms.find((r) => r.roomId === roomId);
    if (room) {
      if (room.users === 1) {
        this.chatRooms = this.chatRooms.filter((r) => r.roomId !== roomId);
      } else {
        room.users -= 1;
      }
      client.leave(roomId);
      this.server.to(roomId).emit('users', room.users);
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    const roomId = payload.roomId;
    this.server.to(roomId).emit('message', payload);
  }
}
