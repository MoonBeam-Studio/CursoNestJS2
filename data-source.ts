import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './src/app.module';

export default new DataSource(dataSourceOptions);
