import { Delete } from "@nestjs/common";
import { Pet } from "../../pets/entities/pet.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id: number;
    
    @Column({ unique: true, nullable: false })
    email: string;
    
    @Column({nullable: false})
    password: string;
    
    @Column()
    name: string;

    @Column({ default: 'user' })
    rol: string;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Pet, (pet) => pet.owner)
    pets: Pet[];

}

