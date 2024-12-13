import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ description: 'Name of the product', example: 'Honey Panel X' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the product', example: 'Advanced technology for honey production' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Price of the product', example: 299.99 })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Product image file',
    type: 'string',
    format: 'binary',
  })
  image: any;
}
