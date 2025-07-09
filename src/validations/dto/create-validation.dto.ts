import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateValidationDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    @IsString()
    @IsNotEmpty()s
    name: string;
}
