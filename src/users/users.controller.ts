import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/user.decorator';
import { UserEntity } from './entities/user.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Users } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Post('createAgent')
    createAgent(@Body() createAgentDto: CreateAgentDto, @User() user: UserEntity) {
      console.log('created')
      return this.usersService.createAgent(createAgentDto, user);
    }
  @UseGuards(JwtAuthGuard)
  @Get('agents')
  findAll(@User() user:UserEntity) {
    console.log(user)
    return this.usersService.findAll(user.organization_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@User() user:UserEntity){
    return user
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
