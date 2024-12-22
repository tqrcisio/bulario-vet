import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ minLength: 3, maxLength: 50, required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({ minLength: 6, maxLength: 70, required: false })
  @IsOptional()
  @IsEmail(undefined)
  @MinLength(6)
  @MaxLength(70)
  email: string;
}
