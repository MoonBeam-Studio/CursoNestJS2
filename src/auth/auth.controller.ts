import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users - User related fields (register, validation, login, show all, etc)')
@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user, leaving it unvalidated till an admin validates it'})
    register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login of an user. Granting an Auth Token if succesfull', description: '' })
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }
}
