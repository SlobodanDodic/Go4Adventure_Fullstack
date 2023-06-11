import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshedTokenGuard } from 'src/common/guards/refreshed_token.guard';
import { UserService } from './user.service';

const defaultConfig = diskStorage({
  destination: process.env.UPLOAD_DIR,
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
    return this.usersService.getMyProfile(refreshToken);
  }

  // Create logged user's profile:
  @UseGuards(RefreshedTokenGuard)
  @Post('me')
  @UseInterceptors(FileInterceptor('file', { storage: defaultConfig }))
  createProfile(@GetCurrentUser('refreshToken') refreshToken: string, @Body('info') info: string, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.createProfile(refreshToken, info, file);
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