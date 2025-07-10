/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { ValidationsModule } from './validations/validations.module';
import { DbModule } from './db/db.module';
import { dataSourceOptions } from './db/data-source';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CatsModule,
    BreedsModule,
    UsersModule,
    AuthModule,
    PetsModule,
    ValidationsModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
