import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Post title",
        type: String
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Post description",
        type: String
    })
    description: string;
}