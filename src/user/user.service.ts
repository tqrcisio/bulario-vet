import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const userEntity = new UserEntity();

    userEntity.email = data.email;
    userEntity.password = data.password;
    userEntity.name = data.name;

    return this.userRepository.save(userEntity);
  }

  async list() {
    const savedUsers = await this.userRepository.find();
    const usersList = savedUsers.map(
      (user) => new ListUserDto(user.id, user.name),
    );
    return usersList;
  }

  async findByEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });
    return checkEmail;
  }

  async update(id: string, newData: UpdateUserDto) {
    await this.userRepository.update(id, newData);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}
