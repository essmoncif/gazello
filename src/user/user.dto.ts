import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "The username should be unique",
        type: String
    })
    username: string;

    @IsEmail()
    @ApiProperty({
        description: "Email of user",
        type: String
    })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Password of user",
        type: String
    })
    password: string;
}

export class UserLoginDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "The username should be unique",
        type: String
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Password of user",
        type: String
    })
    password: string;
}