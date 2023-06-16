import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Public } from 'src/common/decorators/public.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream } from 'fs';
import { GalleryDto } from './dto/gallery.dto';
const fs = require('fs');

const defaultConfig = diskStorage({
  destination: function (req, file, cb) {
    var dir = process.env.UPLOAD_DIR + "/" + req.params.username;
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (err) {
      console.error(err)
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}${extname(file.originalname)}`;
    cb(null, filename);
  }
})

@Public()
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) { }

  // Upload photos for the carousel in the Tiptap editor:
  @Post('uploads/:username')
  @UseInterceptors(FilesInterceptor('files', 20, { storage: defaultConfig }))
  uploads(@Body() dto: GalleryDto, @UploadedFiles(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 25 }),
      ],
    }),) files: { files?: Express.Multer.File[] }) {
    return this.galleryService.uploads(dto, files);
  }

  // controller without service for images:
  @Get('uploads/:username/:id')
  getFiles(@Param('id') id: string, @Param('username') username: string): StreamableFile {
    const image = createReadStream(join(process.cwd(), `${process.env.UPLOAD_DIR}/${username}/${id}`));
    return new StreamableFile(image);
  }

  // controller without service for logo image:
  @Get('uploads/:username/logo/:id')
  getLogo(@Param('id') id: string, @Param('username') username: string): StreamableFile {
    const image = createReadStream(join(process.cwd(), `${process.env.UPLOAD_DIR}/${username}/logo/${id}`));
    return new StreamableFile(image);
  }

  // controller without service for cover image:
  @Get('uploads/:username/cover/:id')
  getCoverFile(@Param('id') id: string, @Param('username') username: string): StreamableFile {
    const image = createReadStream(join(process.cwd(), `${process.env.UPLOAD_DIR}/${username}/cover/${id}`));
    return new StreamableFile(image);
  }
}
