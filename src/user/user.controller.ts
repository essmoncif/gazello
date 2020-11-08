import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserLoginDTO, UserRegisterDTO } from './user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post("auth/register")
    @UsePipes(new ValidationPipe())
    @ApiCreatedResponse({ description: 'The user has been successfully create.'})
    @ApiResponse({ status: 400, description: 'This username is already exist !'})
    async register(@Body() userRegisterDTO: UserRegisterDTO){
        return await this.userService.register(userRegisterDTO);
    }

    @Post("auth/login")
    @UsePipes(new ValidationPipe())
    @ApiCreatedResponse({ description: 'The user has been successfully connected.'})
    @ApiResponse({ status: 400, description: 'Invalid username or password!'})
    async login(@Body() userLoginDTO: UserLoginDTO){
        return await this.userService.login(userLoginDTO);
    }

    @Get("api/users/:username")
    @ApiOkResponse({description: "User data"})
    @ApiNotFoundResponse({description: "user not found"})
    async findUser(@Param("username") username: string){
        return await this.userService.findUser(username);
    }
}
