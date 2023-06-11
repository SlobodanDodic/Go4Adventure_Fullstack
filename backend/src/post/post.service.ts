import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  async getPosts() {
    return await this.prisma.post.findMany({
      include: {
        author: { select: { username: true, email: true } },
      },
    });
  }

  async getPost(id: string) {
    return await this.prisma.post.findUnique({
      where: { id: id },
      select: {
        author: { select: { username: true, email: true } },
        group: true,
        category: true,
        subcategory: true,
        title: true,
        price: true,
        editorText: true,
        location: true,
        likes: true,
        dateRange: true,
        comments: true,
      }
    })
  }

  async createPost(dto: PostDto) {
    return await this.prisma.post.create({
      data: {
        author: { connect: { username: dto.author } },
        group: dto.group,
        category: dto.category,
        subcategory: dto.subcategory,
        title: dto.title,
        price: dto.price,
        editorText: dto.editorText,
        location: dto.location,
        dateRange: dto.dateRange,
      },
    });
  }

  // async createPost(dto: PostDto, files: any) {
  //   const dataPath = files.map((file: any) => ({
  //     path: file.path
  //   }))

  //   return await this.prisma.post.create({
  //     data: {
  //       author: { connect: { username: dto.author } },
  //       group: dto.group,
  //       category: dto.category,
  //       subcategory: dto.subcategory,
  //       title: dto.title,
  //       price: dto.price,
  //       editorText: dto.editorText,
  //       location: dto.location,
  //       images: { createMany: ({ data: dataPath }), }
  //     },
  //   });
  // }


}

