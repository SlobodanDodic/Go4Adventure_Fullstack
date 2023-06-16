import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshedTokenGuard } from 'src/common/guards/refreshed_token.guard';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
const fs = require('fs');

const defaultConfig = diskStorage({
  destination: function (req, file, cb) {
    var dir = process.env.UPLOAD_DIR + "/" + req.params.username + "/logo";
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
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  // Get logged user's profile:
  @UseGuards(RefreshedTokenGuard)
  @Get('me')
  getMyProfile(@GetCurrentUser('refreshToken') refreshToken: string) {
    // return this.usersService.getMyProfile(refreshToken);
    return console.log(refreshToken)
  }

  // Create logged user's profile:
  @UseGuards(RefreshedTokenGuard)
  @Patch('me/:username')
  @UseInterceptors(FileInterceptor('file', { storage: defaultConfig }))
  updateProfile(@GetCurrentUser('refreshToken') refreshToken: string, @Body() dto: UserDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 25 }),
      ],
    }),) file: Express.Multer.File) {
    return this.usersService.updateProfile(refreshToken, dto, file);
  }

  // Get users by search:
  @Get(':username')
  findUsers(@Param('username') username: string) {
    return this.usersService.findUsers(username);
  }

  // Get user's profile:
  @Get('profile/:username')
  findUserProfile(@Param('username') username: string) {
    return this.usersService.findUserProfile(username);
  }

  // Get user's avatars(controller without service):
  @Get('avatars/:fileId')
  async serveAvatar(@Param('fileId') fileId: string, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }

}