import { Breed } from '../../breeds/entities/breed.entity';
import { Pet } from '../../pets/entities/pet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cat {
  @Column({ primary: true, generated: true })
  id: number;
  @Column()
  age: number;
  @ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true,
  })
  breed: Breed;
  @Column({ default: 10 })
  weight: number;
  @Column({ default: 10 })
  height: number;
  @Column({ default: 10 })
  length: number;
  @DeleteDateColumn()
  deletedAt: Date;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Pet, (pet) => pet.cat)
  pet: Pet[];
}
