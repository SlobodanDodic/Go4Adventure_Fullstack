import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  // Get logged user's profile:
  async getMyProfile(refreshToken: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: { token: refreshToken },
      select: {
        id: true,
        email: true,
        username: true,
        profile: {
          select: { info: true, profileImg: true },
        },
      },
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    return foundUser;
  }

  // Create logged user's profile:
  async createProfile(refreshToken: string, info: string, file: any) {
    return this.prisma.user.update({
      where: { token: refreshToken },
      data: {
        profile: {
          create: { profileImg: file.path, info: info },
        },
      },
    });
  }

  // Get users by search:
  async findUsers(username: string) {
    return await this.prisma.user.findMany({
      where: { username: { contains: username } }
    });
  }

  // Get user's profile:
  async findUserProfile(username: string) {
    return await this.prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        email: true,
        username: true,
        posts: {
          include: { author: true, likes: true, comments: { include: { commentAuthor: true } } }
        },
        profile: {
          select: { info: true, profileImg: true },
        },
      }
    })
  }
}