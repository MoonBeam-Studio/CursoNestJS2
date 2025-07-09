import { IsString, IsNotEmpty, MinLength, IsNumber, IsEmail } from "class-validator";

export class CreatePetDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
    @IsNumber()
    @IsNotEmpty()
    catId: number;
    @IsEmail()
    @IsNotEmpty()
    ownerEmail: string;
}
