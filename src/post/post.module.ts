import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { UserEntity } from '../user/user.entity';
import { PostController } from './post.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PostEntity])
  ],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController]
})
export class PostModule {}
