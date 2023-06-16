import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(3)
  public name: string;

  @IsString()
  @MinLength(3)
  public address: string;

  @IsString()
  @MinLength(3)
  public info: string;

  @IsString()
  @MinLength(3)
  public phone: string;

  @IsString()
  @IsNotEmpty()
  public logo: string;
}
