import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UsersService, JwtAuthGuard, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
