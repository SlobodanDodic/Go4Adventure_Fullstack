import { Gallery, Like, User } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public author: User['username'];

  @IsString()
  @IsNotEmpty()
  public group: string;

  @IsString()
  @IsNotEmpty()
  public category: string;

  @IsString()
  @IsNotEmpty()
  public subcategory: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public price: string;

  @IsString()
  @IsNotEmpty()
  public editorText: string;

  @IsString()
  @IsOptional()
  public location: string;

  @IsString()
  @IsOptional()
  public dateRange: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public likes: Like['id'];

  @IsString()
  @IsOptional()
  public images: Gallery['id'];
}