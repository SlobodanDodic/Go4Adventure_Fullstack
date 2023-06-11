import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GalleryDto } from './dto/gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) { }

  async uploads(dto: GalleryDto, files: any) {
    const dataPath = files.map((file: any) => ({ path: file.path }))

    return await this.prisma.user.update({
      where: { id: dto.author },
      data: {
        images: {
          createMany: { data: dataPath },
        },
      },
      include: { images: true },
    })
  }

  // async getPosts() {
  //   return await this.prisma.gallery.findMany({
  //     include: {
  //       author: { select: { username: true, email: true } },
  //       images: { select: { path: true, id: true } },
  //     },
  //   });
  // }

}
