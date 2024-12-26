import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConflictException } from '@nestjs/common';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    responses: {
      201: { description: 'User created successfully' },
      409: { description: 'This email is already in use' },
    },
  })
  async create(@Body() userData: CreateUserDto) {
    const userWithSameEmail = await this.userService.findByEmail(
      userData.email,
    );
    if (!userWithSameEmail) {
      const createdUser = await this.userService.create(userData);
      const newUser = new ListUserDto(
        createdUser.id,
        createdUser.name,
        createdUser.email,
      );
      return newUser;
    } else {
      throw new ConflictException('This email is already in use');
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
    responses: {
      200: { description: 'User found successfully' },
      404: { description: 'User not found' },
    },
  })
  async getById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new ListUserDto(user.id, user.name, user.email, user.deleted);
  }

  @Get()
  @ApiOperation({
    summary: 'List all users',
    responses: {
      200: { description: 'List of users found successfully' },
    },
  })
  async listAll() {
    const users = await this.userService.findAll();
    const usersList = users.map(
      (user) => new ListUserDto(user.id, user.name, user.email),
    );
    return usersList;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user',
    responses: {
      200: { description: 'User updated successfully' },
      404: { description: 'User not found' },
      409: { description: 'This email is already in use' },
    },
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new ConflictException('User not found');
    }

    if (updateUserDto.email) {
      const userWithSameEmail = await this.userService.findByEmail(
        updateUserDto.email,
      );
      if (userWithSameEmail) {
        throw new ConflictException('This email is already in use');
      }
    }

    await this.userService.update(id, updateUserDto);
    return { message: 'User updated successfully' };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    responses: {
      200: { description: 'User deleted successfully' },
      404: { description: 'User not found' },
    },
  })
  async delete(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
