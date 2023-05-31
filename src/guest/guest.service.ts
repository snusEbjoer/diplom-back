import { Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GuestService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createGuestDto: CreateGuestDto) {
    return await this.prisma.guest.create({data:{
      ...createGuestDto
    }});
  }

  findAll() {
    return `This action returns all guest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guest`;
  }

  update(id: number, updateGuestDto: UpdateGuestDto) {
    return `This action updates a #${id} guest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guest`;
  }
}
