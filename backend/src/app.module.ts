import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PostModule } from './post/post.module';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';
import { AssignedTokenGuard } from './common/guards/assigned_token.guard';
import { GalleryModule } from './gallery/gallery.module';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
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
    MulterModule.register({ dest: './uploads' }),
    AuthModule,
    PrismaModule,
    PostModule,
    GalleryModule,
    UserModule,
    LikeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AssignedTokenGuard,
    },
  ],
})
export class AppModule { }
