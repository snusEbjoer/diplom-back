import { Body, Controller, Post, HttpCode, HttpStatus, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('email') email: string,
        @Body('fio') fio: string,
    ): Promise<Users> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.usersService.createUser({
            fio,
            email,
            password:hashedPassword,
        }
        );
        return result;
    }
    
    @Get()
    async validate(@Body('id') id: number) {
      return await this.authService.validate(id)
    }
}
