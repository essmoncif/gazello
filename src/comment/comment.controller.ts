import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { CommentService } from './comment.service';
import { CommentDTO } from './comment.dto';
import { User } from '../user/user.decorator';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService){}

    @Get("post/:postId")
    @ApiParam({
        name: 'postId',
        type: String
    })
    @ApiQuery({
        name: 'page',
        type: Number
    })
    @ApiOkResponse({description: 'List of comments of post :postId'})
    @ApiNotFoundResponse({description: 'Post not found!'})
    async showBypost(@Param('postId') postId: string, @Query('page') page: number) {
        return await this.commentService.showByPost(postId, page);
    }

    @Get("user/:userId")
    @ApiParam({
        name: 'userId',
        type: String
    })
    @ApiQuery({
        name: 'page',
        type: Number
    })
    @ApiOkResponse({description: 'List of comments of user :userId'})
    @ApiNotFoundResponse({description: 'User not found!'})
    async showByUser(@Param('userId') userId: string, @Query('page') page: number){
        return await this.commentService.showByUser(userId, page);
    }

    @Get(":id")
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiOkResponse({description: 'The comment has been successfully found'})
    @ApiNotFoundResponse({description: 'comment not found!'})
    async showOne(@Param('id') id: string){
        return await this.commentService.findOneComment(id);
    }

    @Put("create/:id")
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiBearerAuth()
    @ApiBody({
        type: CommentDTO
    })
    @ApiOkResponse({description: 'The comment has been successfully create.'})
    @ApiNotFoundResponse({description: 'Post not found'})
    async create(@Param('id') postId: string, @Body() commentDTO: CommentDTO, @User('id') userId: string){
        return await this.commentService.create(postId, userId, commentDTO);
    }

    @Put("update/:id")
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @ApiBearerAuth()
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiBody({
        type: CommentDTO
    })
    @ApiOkResponse({description: 'The comment has been successfully update.'})
    @ApiUnauthorizedResponse({description: "Unauthorized access to update!"})
    @ApiNotFoundResponse({description: 'Comment not found'})
    async updateComment(@Param('id') commentId: string, @Body() commentDTO: Partial<CommentDTO>, @User('id') userId){
        return await this.commentService.update(commentId, userId, commentDTO);
    }

    @Delete("remove/:id")
    @UseGuards(new AuthGuard())
    @ApiBearerAuth()
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiOkResponse({description: 'The comment has been successfully delete.'})
    @ApiUnauthorizedResponse({description: "Unauthorized access to delete!"})
    @ApiNotFoundResponse({description: 'Comment not found'})
    async deleteComment(@Param('id') commentId: string, @User('id') userId: string){
        return await this.commentService.delete(commentId, userId);
    }

}
