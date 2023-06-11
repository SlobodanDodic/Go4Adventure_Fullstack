import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PostDto } from './dto/post.dto';

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
  createPost(@Body() dto: PostDto) {
    return this.postService.createPost(dto);
  }

  // const defaultConfig = diskStorage({
  //   destination: process.env.UPLOAD_DIR,
  //   filename: (req, file, cb) => {
  //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //     const filename = `${uniqueSuffix}${extname(file.originalname)}`;
  //     cb(null, filename);
  //   }
  // })
  // @Post('create')
  // @UseInterceptors(FilesInterceptor('files', 20, { storage: defaultConfig }))
  // createPost(@Body() dto: PostDto, @UploadedFiles(
  //   new ParseFilePipe({
  //     validators: [
  //       new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //       new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 25 }),
  //     ],
  //   }),) files: { files?: Express.Multer.File[] }) {
  //   return this.postService.createPost(dto, files);
  // }

}
