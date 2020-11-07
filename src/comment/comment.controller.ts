import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { CommentService } from './comment.service';
import { CommentDTO } from './comment.dto';
import { User } from '../user/user.decorator';

@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService){}

    @Get("post/:postId")
    async showBypost(@Param('postId') postId: string, @Query('page') page: number) {
        return await this.commentService.showByPost(postId, page);
    }

    @Get("user/:userId")
    async showByUser(@Param('userId') userId: string, @Query('page') page: number){
        return await this.commentService.showByUser(userId, page);
    }

    @Get(":id")
    async showOne(@Param('id') id: string){
        return await this.commentService.findOneComment(id);
    }

    @Put("create/:id")
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    async create(@Param('id') postId: string, @Body() commentDTO: CommentDTO, @User('id') userId: string){
        return await this.commentService.create(postId, userId, commentDTO);
    }

    @Put("update/:id")
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    async updateComment(@Param('id') commentId: string, @Body() commentDTO: Partial<CommentDTO>, @User('id') userId){
        return await this.commentService.update(commentId, userId, commentDTO);
    }

    @Delete("remove/:id")
    @UseGuards(new AuthGuard())
    async deleteComment(@Param('id') commentId: string, @User('id') userId: string){
        return await this.commentService.delete(commentId, userId);
    }

}
