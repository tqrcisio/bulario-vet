import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateMedicineDto {
  @ApiProperty({ minLength: 3, maxLength: 100, example: 'Pencivet Plus PPU' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 255,
    example: 'Pencivet is a injectable anti-bacterial, ready for use.',
  })
  @MinLength(6)
  @MaxLength(255)
  description: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'The ID of the technical responsible',
  })
  @IsNumber()
  @IsNotEmpty()
  technical_responsible_id: number;
}
