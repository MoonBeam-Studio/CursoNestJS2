import { Delete } from "@nestjs/common";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

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
}

