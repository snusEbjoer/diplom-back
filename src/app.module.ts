import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'nestjs-prisma';

import { FaqModule } from './faq/faq.module';
import { GuestModule } from './guest/guest.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationModule } from './organization/organization.module';
import { ConversationModule } from './conversation/conversation.module';



@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true
    }),
    FaqModule,
    GuestModule,
    AuthModule,
    UsersModule,
    OrganizationModule,
    ConversationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
