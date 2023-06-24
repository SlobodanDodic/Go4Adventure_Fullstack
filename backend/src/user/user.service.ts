import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

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
        role: true,
        posts: {
          include: { author: true, likes: true, comments: { include: { commentAuthor: true } } }
        },
        profile: {
          select: { name: true, address: true, phone: true, info: true, logo: true },
        },
        images: {
          select: { path: true },
        },
        likes: {
          select: { id: true },
        }
      }
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    return foundUser;
  }

  // Create logged user's profile:
  async updateProfile(refreshToken: string, dto: UserDto, file: any) {
    return await this.prisma.user.update({
      where: { token: refreshToken },
      data: {
        profile: {
          create: { logo: file.path, name: dto.name, address: dto.address, phone: dto.phone, info: dto.info },
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
        role: true,
        posts: {
          include: { author: true, likes: true, comments: { include: { commentAuthor: true } } }
        },
        profile: {
          select: { name: true, address: true, phone: true, info: true, logo: true },
        },
        images: {
          select: { path: true },
        }
      }
    })
  }
}