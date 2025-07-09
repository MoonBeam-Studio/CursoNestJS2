/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/entities/cat.entity';
import { BreedsModule } from './breeds/breeds.module';
import { Breed } from './breeds/entities/breed.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { Pet } from './pets/entities/pet.entity';
import { ValidationsModule } from './validations/validations.module';
import { Validation } from './validations/entities/validation.entity';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { dataSourceOptions } from './data-source';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CatsModule,
    BreedsModule,
    UsersModule,
    AuthModule,
    PetsModule,
    ValidationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
