/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  MinLength,
  IsPositive,
} from 'class-validator';

export class CreateCatDto {
  
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  age: number;
  @IsOptional()
  @IsString()
  breed?: string;
}
