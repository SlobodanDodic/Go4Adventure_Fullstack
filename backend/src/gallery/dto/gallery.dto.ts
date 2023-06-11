import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class GalleryDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public path: string;

  @IsString()
  @IsNotEmpty()
  public author: User['id'];
}