import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './src/db/data-source';

export default new DataSource(dataSourceOptions);
