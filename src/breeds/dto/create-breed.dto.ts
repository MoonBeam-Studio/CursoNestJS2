import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  origin?: string;
  @IsBoolean()
  @IsOptional()
  childFriendly?: boolean;
  @IsBoolean()
  @IsOptional()
  dogFriendly?: boolean;
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  energyLevel?: number;
}
