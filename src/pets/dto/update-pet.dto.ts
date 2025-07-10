import { PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePetDto extends PartialType(CreatePetDto) {
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @MinLength(3)
    name?: string;
}
