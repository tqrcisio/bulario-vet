import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ minLength: 3, maxLength: 50, example: 'John Doe' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({ minLength: 6, maxLength: 70, example: 'johndoe@example.com' })
  @IsEmail(undefined)
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(70)
  email: string;

  @ApiProperty({ minLength: 6, maxLength: 255, example: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}
