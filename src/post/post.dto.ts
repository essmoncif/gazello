import { IsNotEmpty, IsString } from "class-validator";

export class PostDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}