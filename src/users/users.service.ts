import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { Users } from '@prisma/client';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  

  async createAgent({password, ...createAgentDto}: CreateAgentDto, user: UserEntity) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return await this.prisma.users.create({data: {
      ...createAgentDto,
      password:hashedPassword,
      role: 'agent',
      organization_id: user.organization_id
    }});
  }

  async findAll(organization_id: number) {
    return await this.prisma.users.findMany({where: {role: 'agent', organization_id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.prisma.users.findFirst({ where: { id } })
    if (!user){
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    return user
  }
}
