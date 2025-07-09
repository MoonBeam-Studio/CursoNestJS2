
import { Pet } from "src/pets/entities/pet.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";

@Entity()
export class Validation {
    @Column({ primary: true, generated: true })
    id: number;
    
    @Column({ unique: true, nullable: false })
    email: string;
    
    @Column({nullable: false})
    password: string;
    
    @Column()
    name: string;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
