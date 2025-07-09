import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { CatsModule } from '../cats/cats.module';
import { UsersModule } from '../users/users.module';
import { CatsService } from '../cats/cats.service';
import { UsersService } from '../users/users.service';
import { BreedsModule } from '../breeds/breeds.module';
import { BreedsService } from '../breeds/breeds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), CatsModule, UsersModule, BreedsModule],
  controllers: [PetsController],
  providers: [PetsService, CatsService, UsersService, BreedsService],
})
export class PetsModule {}
