import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,private jwtService: JwtService, private prisma: PrismaService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!await bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: "1d"
      })
    };
  }
  async createUser(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({data: {
      email:createUserDto.email,
      fio:createUserDto.fio,
      password:createUserDto.password,
      role: 'organizator',
      organization: {create:{
        name: createUserDto.name
      }}
    }});
  }
  async validate(userId: number) {
    return await this.prisma.users.findUnique({where: {id: userId}})
  }
}
