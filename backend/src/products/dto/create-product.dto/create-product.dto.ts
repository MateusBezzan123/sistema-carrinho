import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value)) 
  price: number;

  @IsString()
  @IsOptional()
  image?: string;
}
