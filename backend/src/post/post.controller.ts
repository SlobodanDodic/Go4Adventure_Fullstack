import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { Public } from 'src/common/decorators/public.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostDto } from './dto/post.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

const defaultConfig = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}${extname(file.originalname)}`;
    cb(null, filename);
  }
})

@Public()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Post('create')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: defaultConfig,
    })
  )
  createPost(@Body() dto: PostDto, @UploadedFiles(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 25 }),
      ],
    }),) files: { files?: Express.Multer.File[] }) {
    return this.postService.createPost(dto, files);
  }


}
