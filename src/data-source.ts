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
  entities: [__dirname + '/**/entities/*.entity{.js,.ts}'],
  synchronize: false,
  seeds: [
    __dirname + '/../seed/**/*{.ts,.js}',
    __dirname + '/../seeds/**/*{.ts,.js}'
  ],
  factories: [
    __dirname + '/../factory/**/*{.ts,.js}',
    __dirname + '/../factories/**/*{.ts,.js}'
  ],
};