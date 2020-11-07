import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Comment content"
    })
    text: string;
}