import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import 'dotenv/config';
import { PostEntity } from '../post/post.entity';



@Entity({name : "user"})
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "text",
        unique: true
    })
    username: string;

    @Column('text')
    password: string;

    @CreateDateColumn()
    created: Date;

    @Column({
        type: "text",
    })
    email: string;

    @OneToMany(()=> PostEntity, post => post.author)
    posts: PostEntity[];

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    get token(): string {
        const {id, username} = this;
        return jwt.sign({
            id,
            username
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
        )
    }
}