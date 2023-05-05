import { Body, Controller, Post, HttpCode, HttpStatus, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/common/user.decorator';
import { CreateAgentDto } from 'src/users/dto/create-agent.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Post('/signup')
    async createUser(
        @Body() {password, fio, email, name}: CreateUserDto
    ): Promise<Users> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.authService.createUser({
            fio,
            email,
            password:hashedPassword,
            name
        }
        );
        return result;
    }
    @Get()
    async validate(@Body('id') id: number) {
      return await this.authService.validate(+id)
    }
}
