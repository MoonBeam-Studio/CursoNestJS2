import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @MinLength(3)
    name?: string;
}
