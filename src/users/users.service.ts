import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { Users } from '@prisma/client';
import { CreateAgentDto } from './dto/create-agent.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/user.decorator';
import { UserEntity } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async createUser(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({data: {
      ...createUserDto,
      role: 'organizator',
      organization: {create:{
        name: 'jopa'
      }}
    }});
  }

  async createAgent(createAgentDto: CreateAgentDto, @User() user: UserEntity) {
    
    return await this.prisma.users.create({data: {
      ...createAgentDto,
      role: 'agent',
      organization: {create:{
        name: 'jopa'
      }}
    }});
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOne(email: string): Promise<Users> {
    const user = await this.prisma.users.findFirst({ where: { email } })
    if (!user){
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    return user
  }
}
