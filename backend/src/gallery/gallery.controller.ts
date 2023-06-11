import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Public } from 'src/common/decorators/public.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream } from 'fs';
import { GalleryDto } from './dto/gallery.dto';

const defaultConfig = diskStorage({
  destination: process.env.UPLOAD_DIR,
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

  @Post('uploads')
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

  // controller without service:
  @Get('uploads/:id')
  getFile(@Param('id') id: string): StreamableFile {
    const image = createReadStream(join(process.cwd(), `${process.env.UPLOAD_DIR}/${id}`));
    console.log(image);
    return new StreamableFile(image);
  }
}
