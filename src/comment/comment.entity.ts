import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from '../user/user.entity';
import { PostEntity } from "src/post/post.entity";


@Entity("comment")
export class CommentEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    text: string;

    @ManyToOne(type => UserEntity)
    @JoinTable()
    author: UserEntity;

    @ManyToOne(type => PostEntity, post => post.comments)
    post: PostEntity;

    @CreateDateColumn()
    created: Date;
}