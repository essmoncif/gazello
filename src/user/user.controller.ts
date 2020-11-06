import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserLoginDTO, UserRegisterDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post("auth/register")
    @UsePipes(new ValidationPipe())
    async register(@Body() userRegisterDTO: UserRegisterDTO){
        return await this.userService.register(userRegisterDTO);
    }

    @Post("auth/login")
    @UsePipes(new ValidationPipe())
    async login(@Body() userLoginDTO: UserLoginDTO){
        return await this.userService.login(userLoginDTO);
    }

    @Get("api/users/:username")
    async findUser(@Param("username") username: string){
        return await this.userService.findUser(username);
    }
}
