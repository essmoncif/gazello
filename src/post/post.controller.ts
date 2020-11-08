import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../user/user.decorator';
import { PostDTO } from './post.dto';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){}

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @ApiBody({
        description: "Create new post",
        type: PostDTO,
    })
    @ApiBearerAuth()
    @ApiOkResponse({description: "The post has been successfully created."})
    @ApiNotFoundResponse({description: "Current user not found!"})
    async create(@User('id') user: string, @Body() postDTO: PostDTO){
        return await this.postService.createPost(user, postDTO);
    }

    @Get()
    @ApiQuery({
        name: 'page',
        type: Number
    })
    @ApiOkResponse({description: "List of posts."})
    async showAllPosts(@Query('page') page: number){
        return await this.postService.findAllPosts(page);
    }

    @Get('newest')
    @ApiQuery({
        name: 'page',
        type: Number
    })
    @ApiOkResponse({description: "List of new posts."})
    async showNewestPosts(@Query('page') page: number){
        return this.postService.findAllPosts(page, true);
    }

    @Get(":id")
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiOkResponse({description: "The post has been successfully found."})
    @ApiNotFoundResponse({description: "Post not found!"})
    async findOnePost(@Param('id') postID: string){
        return await this.postService.findOnePost(postID);
    }

    @Put("update/:id")
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiBearerAuth()
    @ApiOkResponse({description: "The post has been successfully updated."})
    @ApiUnauthorizedResponse({description: "Unauthorized access to update!"})
    @ApiBody({
        type: PostDTO
    })
    async updatePost(@Param("id") postId: string, @User('id') userId: string, @Body() data: Partial<PostDTO>){
        return await this.postService.update(postId, userId, data);
    }

    @Delete('remove/:id')
    @UseGuards(new AuthGuard())
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiBearerAuth()
    @ApiOkResponse({description: "The post has been successfully deleted."})
    @ApiUnauthorizedResponse({description: "Unauthorized access to delete!"})
    async detelePost(@User('id') userId: string, @Param('id') postId: string ){
        return await this.postService.detele(postId, userId);
    }

}
