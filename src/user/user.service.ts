import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDTO, UserRegisterDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ){}

    async register(userRegisterDTO: UserRegisterDTO){
        const {username} = userRegisterDTO;

        let user = await this.userRepository.findOne({where:{username}});
        if(user){
            throw new HttpException(`user : ${username} is already exist`, HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(userRegisterDTO);
        await this.userRepository.save(user);
        return {...user};
    }

    async findUser(username: string){
        const user = await this.userRepository.findOne({where: {username}});
        if(!user)
            throw new HttpException(`user: ${username} not found !`, HttpStatus.NOT_FOUND);
        return user;
    }

    async login(userLoginDTO: UserLoginDTO){
        const {username, password} = userLoginDTO;
        const user = await this.userRepository.findOne({where: {username}});
        if(!user || !(await user.comparePassword(password)))
            throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST);
        const token = user.token;
        return {...user, token};
    }
}
