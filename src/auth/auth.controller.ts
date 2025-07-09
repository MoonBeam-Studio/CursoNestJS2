import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard.ts.guard';
import { Role } from '../enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends Request {
    user: { email: string, rol: string };
}

@ApiTags('Users - User related fields (register, validation, login, show all, etc)')
@Controller('auth')
export class AuthController {

    constructor( private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user, leaving it unvalidated till an admin validates it'})
    register(@Body() registerDto: RegisterDto){
        console.log(registerDto);
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login of an user. Granting an Auth Token if succesfull', description: '' })
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }
}
