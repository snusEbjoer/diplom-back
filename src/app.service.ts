import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService){}
  getHello(): string {
    return 'Hello World!';
  }
  async getGuests(){
    return await this.prisma.guest.findMany()
  }
}
