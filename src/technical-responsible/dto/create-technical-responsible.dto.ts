import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTechnicalResponsibleDto {
  @ApiProperty({ minLength: 3, maxLength: 100, example: 'John Doe' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({ minLength: 6, maxLength: 100, example: '1536' })
  @MinLength(3)
  @MaxLength(50)
  crmv: string;
}
