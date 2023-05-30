import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDtoRegister, AuthDtoLogin } from './dto/auth.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

  async register(dto: AuthDtoRegister) {
    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword,
          username: dto.username,
        },
      });

      return this.signToken(user.id, user.username);

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDtoLogin) {
    const user = await this.prisma.user.findUnique({ where: { username: dto.username } });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.hashedPassword, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.username);
  }

  async signToken(userId: string, username: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, username };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, { expiresIn: '300m', secret: secret });

    return { access_token: token };
  }

  async signout() {
    return "signout"
  }

}