import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrganizationService } from 'src/organization/organization.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [UsersController],
  providers: [UsersService, OrganizationService, PrismaService]
})
export class UsersModule {}
