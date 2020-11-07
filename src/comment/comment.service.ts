import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { CommentDTO } from './comment.dto';
import { CommentEntity } from './comment.entity';
import { PostEntity } from '../post/post.entity';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
    ){}

    private _ownership(commentEntity: CommentEntity, userId: string){
        if(commentEntity.author.id !== userId)
            throw new HttpException(`Incorrect user`, HttpStatus.UNAUTHORIZED);
    }

    async findOneComment(commentId: string){
        const comment = await this.commentRepository.findOne({
            where: {id: commentId},
            relations: ['author', 'post']
        });
        if(!comment)
            throw new HttpException(`comment id: ${commentId} not found !`, HttpStatus.NOT_FOUND);
        return comment;
    }

    async showByPost(postId: string, page: number = 1): Promise<CommentEntity[]> {
        const comments = await this.commentRepository.find({
            where: {post: {id: postId}},
            relations: ['post', 'author'],
            take: 25,
            skip: 25*(page  - 1)
        });
        return comments;
    }

    async showByUser(userId: string, page: number = 1): Promise<CommentEntity[]> {
        const comments = await this.commentRepository.find({
            where: {author: {id: userId}},
            relations: ['post', 'author'],
            take: 25,
            skip: 25*(page  - 1)
        });
        return comments;
    }

    async create(postId: string, userId: string, data: CommentDTO): Promise<CommentEntity> {
        const post = await this.postRepository.findOne({
            where: {id: postId}
        })
        
        const user = await this.userRepository.findOne({
            where: {id: userId}
        })
        const comment = this.commentRepository.create({
            ...data,
            author: user,
            post: post
        })
        await this.commentRepository.save(comment);
        return comment;
    }

    async delete(commentId: string, userId: string): Promise<CommentEntity> {
        const comment = await this.findOneComment(commentId);
        this._ownership(comment, userId);
        await this.commentRepository.remove(comment);
        return comment;
    }

    async update(commentId: string, userId: string, data: Partial<CommentDTO>): Promise<CommentEntity> {
        const comment = await this.findOneComment(commentId);
        this._ownership(comment, userId);
        await this.commentRepository.update({id: commentId}, data);
        return await this.findOneComment(commentId);
    }

}
