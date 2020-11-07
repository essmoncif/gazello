import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { PostDTO } from './post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
    
    constructor(
        @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ){}

    private _ownership(post: PostEntity, userId: string){
        if(post.author.id !== userId)
            throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }

    async findAllPosts(page: number = 1, newest?: boolean): Promise<PostEntity[]>{
        const posts = await this.postRepository.find({
            relations: ['author', 'comments'],
            take: 25,
            skip: 25 * (page -1),
            order: newest && {created: "DESC"}
        });
        return posts;
    }

    async createPost(userId: string, postDTO: PostDTO): Promise<PostEntity> {
        const user = await this.userRepository.findOne({where: {id: userId}});
        if(user){
            const post = await this.postRepository.create({...postDTO, author: user});
            await this.postRepository.save(post);
            return post;
        }
        throw new HttpException(`user with ${userId} not found !`, HttpStatus.NOT_FOUND);
    }

    async findOnePost(postId: string){
        const post = await this.postRepository.findOne({where: {id: postId}, relations: ['author', 'comments']});
        if(!post)
            throw new HttpException(`post : ${postId} not found !`, HttpStatus.NOT_FOUND);
        return post;
    }

    async update(postId: string, userId: string, data: Partial<PostDTO>){
        let post = await this.postRepository.findOne({
            where: {id: postId},
            relations: ['author', 'comments']
        });
        if(!post)
            throw new HttpException(`post : ${postId} not found`, HttpStatus.NOT_FOUND);
        this._ownership(post, userId);
        await this.postRepository.update({id: postId}, data);
        return await this.findOnePost(postId);
    }

    async detele(postId: string, userId: string){
        const post = await this.findOnePost(postId);
        this._ownership(post, userId);
        await this.postRepository.remove(post);
        return post;
    }
    
}
