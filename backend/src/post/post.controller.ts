import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PostDto } from './dto/post.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
const fs = require('fs');

const defaultConfig = diskStorage({
  destination: function (req, file, cb) {
    var dir = process.env.UPLOAD_DIR + "/" + req.params.username + "/cover";
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

  @Post('create/:username')
  @UseInterceptors(FileInterceptor('file', { storage: defaultConfig }))
  createPost(@Body() dto: PostDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 25 }),
      ],
    }),) file: Express.Multer.File) {
    return this.postService.createPost(dto, file);
  }

  @Get('likedPosts/:userId')
  getLikedPosts(@Param('userId') userId: string) {
    return this.postService.getLikedPosts(userId);
  }

}
