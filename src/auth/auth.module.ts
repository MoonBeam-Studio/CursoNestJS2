import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { ValidationsModule } from '../validations/validations.module';

@Module({
  imports: [UsersModule, ValidationsModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
