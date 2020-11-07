import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {UserEntity} from '../user/user.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity("post")
export class PostEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "text"
    })
    title: string;

    @Column({
        type: "text"
    })
    description: string;

    @Column({
        type: "integer",
        default: 0
    })
    voteCount: number;

    @ManyToOne(()=> UserEntity, user => user.posts)
    author: UserEntity;


    @OneToMany(()=> CommentEntity, comment => comment.post, {cascade: true})
    comments: CommentEntity[];

    @CreateDateColumn()
    created: Date;

}