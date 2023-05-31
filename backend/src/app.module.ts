import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.TRANSPORT_AUTH,
        defaults: {
          from: `"nest-modules" <${process.env.MAIL_FROM}>`,
        },
      }),
    }),
  ],
})
export class AppModule { }
