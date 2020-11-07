import { IsNotEmpty, IsString } from "class-validator";

export class CommentDTO {
    @IsString()
    @IsNotEmpty()
    text: string;
}