import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoRegister, AuthDtoLogin } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() dto: AuthDtoRegister) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDtoLogin) {
    return this.authService.login(dto);
  }

  @Get('signout')
  signout() {
    return this.authService.signout();
  }
}