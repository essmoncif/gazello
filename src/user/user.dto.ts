import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRegisterDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UserLoginDTO {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}