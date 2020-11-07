import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../user/user.decorator';
import { PostDTO } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){}

    @Post()
    @UseGuards(new AuthGuard())
    async create(@User('id') user: string, @Body() postDTO: PostDTO){
        return await this.postService.createPost(user, postDTO);
    }

    @Get()
    async showAllPosts(@Query('page') page: number){
        return await this.postService.findAllPosts(page);
    }

    @Get('newest')
    async showNewestPosts(@Query('page') page: number){
        return this.postService.findAllPosts(page, true);
    }

    @Get(":id")
    async findOnePost(@Param('id') postID: string){
        return await this.postService.findOnePost(postID);
    }

    @Put("update/:id")
    @UseGuards(new AuthGuard())
    async updatePost(@Param("id") postId: string, @User('id') userId: string, @Body() data: Partial<PostDTO>){
        return await this.postService.update(postId, userId, data);
    }

    @Delete('remove/:id')
    @UseGuards(new AuthGuard())
    async detelePost(@User('id') userId: string, @Param('id') postId: string ){
        return await this.postService.detele(postId, userId);
    }

}
