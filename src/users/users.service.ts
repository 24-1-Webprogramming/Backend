import { Injectable } from '@nestjs/common';
//typeorm
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/users.entity';
//dto
import { CreateUserDto } from './dto/create-user.dto';
//bcrypt
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async checkPassword(createUserDto: CreateUserDto){
        let min_password = 8;
        if (createUserDto.password.length < min_password){
            console.log("short password");
            return false;
        }
        let hasUppercase = /[A-Z]/.test(createUserDto.password);
        let hasLowercase = /[a-z]/.test(createUserDto.password);
        let hasNumber = /[0-9]/.test(createUserDto.password);
        let hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(createUserDto.password);
        let characterTypes = [hasUppercase, hasLowercase, hasNumber, hasSpecial];
        let numberOfTypes = characterTypes.filter(Boolean).length;
        if (numberOfTypes < 3) {
            console.log(`count ${numberOfTypes}`);
            return false;
        }
        return true;
    }

    async checkDuplication(createUserDto: CreateUserDto){
        const id = createUserDto.id;
        const user = await this.userRepository.findOne({ where:{ id: id } });
        if (user){
            return false;
        }
        return true;
        
    }

    async sign_up(createUserDto: CreateUserDto){
        console.log(createUserDto.password);
        createUserDto.password = await bcrypt.hash(createUserDto.password, 11);
        console.log(createUserDto);
        this.userRepository.save(createUserDto);
    }
    async leave(createUserDto: CreateUserDto){
        console.log(createUserDto);
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({where: {id: id}});
        //return this.userRepository.findOne({ where:{ id: id } });
    }
}
