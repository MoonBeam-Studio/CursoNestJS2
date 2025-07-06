/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/entities/cat.entity';
import { BreedsModule } from './breeds/breeds.module';
import { Breed } from './breeds/entities/breed.entity';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      entities: [Cat, Breed],
      synchronize: true,
    }),
    BreedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
