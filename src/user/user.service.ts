import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from '../infra/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashPasswordHelper } from '../helpers/hash-password-helper/hash-password-helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const userEntity = new UserEntity();

    userEntity.email = data.email;
    userEntity.password = await HashPasswordHelper.hashPassword(data.password);
    userEntity.name = data.name;

    return this.userRepository.save(userEntity);
  }

  async findAll() {
    const savedUsers = await this.userRepository.find({
      where: { deleted: false },
    });
    const usersList = savedUsers.map(
      (user) => new ListUserDto(user.id, user.name, user.email),
    );
    return usersList;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email, deleted: false },
    });
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: string, newData: UpdateUserDto) {
    await this.userRepository.update(id, newData);
  }
  async deleteUser(id: string) {
    const deletedAt = new Date().toISOString();
    await this.userRepository.update(id, { deleted: true, deletedAt });
  }
}
