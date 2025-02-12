import { IsString, IsNumber, IsOptional, IsPositive, IsUrl } from 'class-validator';
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
  @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
  image?: string;
}
