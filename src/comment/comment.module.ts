import { CommentEntity } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, CommentEntity, UserEntity])
  ],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
