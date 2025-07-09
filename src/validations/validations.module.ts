import { Module } from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { ValidationsController } from './validations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Validation } from './entities/validation.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Validation, User]), UsersModule],
  controllers: [ValidationsController],
  providers: [ValidationsService],
  exports: [ValidationsService],
})
export class ValidationsModule {}
