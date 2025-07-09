import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../users/entities/user.entity";
import { DataSource } from "typeorm";

export default class AdminSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> 
  {
    const userRepository = dataSource.getRepository(User);
    const adminUser = userRepository.create({
        email: 'admin@admin.es',
        password: 'admin',
        name: 'Admin',
        rol: 'admin',
    });
    console.log('Creating admin user...');
    await userRepository.save(adminUser);
    console.log('Admin user created successfully');
}}