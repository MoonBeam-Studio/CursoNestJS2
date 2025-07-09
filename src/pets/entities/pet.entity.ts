import { Cat } from "src/cats/entities/cat.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Pet {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;


    @ManyToOne(() => Cat, (cat) => cat.id, {
        eager: true,
    })
    @JoinColumn()
    cat: Cat;

    @ManyToOne(() => User, (user) => user.id, {
        eager: true,
    })
    @JoinColumn()
    owner: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
