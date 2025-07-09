import { Breed } from 'src/breeds/entities/breed.entity';
import { Pet } from 'src/pets/entities/pet.entity';
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
  @DeleteDateColumn()
  deletedAt: Date;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Pet, (pet) => pet.cat)
  pet: Pet[];
}
