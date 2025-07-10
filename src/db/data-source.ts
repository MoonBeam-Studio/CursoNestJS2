// src/db/data-source.ts
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';


config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'user_crud',
  password: 'root',
  database: 'db_crud',
  entities: ['dist/src/**/*.entity.js'],
  seeds: ['dist/src/db/seeds/**/*.js'],
  factories: ['dist/src/db/factories/**/*.js'],
  synchronize: true, // do not set it true in production application
};
