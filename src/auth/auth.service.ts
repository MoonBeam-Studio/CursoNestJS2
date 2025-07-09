import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ValidationsService } from '../validations/validations.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly validationServide: ValidationsService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService, 
        ) {}

    async register({name,email,password}: RegisterDto) {
        const userValidation = await this.validationServide.findOneByEmail(email);
        const userRegister = await this.usersService.findOneByEmail(email);
        if (userValidation || userRegister) {
            throw new BadRequestException('User already exists');
        }
        return await this.validationServide.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });
    }

    async login({email,password}: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Email is wrong');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is wrong');
        }

        const payload = { email: user.email, rol: user.rol };

        const token = await this.jwtService.sign(payload);

        return {
            access_token: token,
            user: {email: user.email}
        };
    }
}
