import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
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
  @ApiOperation({ summary: 'Create a new user' })
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

  @Get()
  @ApiOperation({ summary: 'Get user by id' })
  async getById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  async listAll() {
    return await this.userService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userExists = await this.userService.findById(updateUserDto.email);
    if (userExists) {
      await this.userService.update(id, updateUserDto);
      return { message: 'User updated successfully' };
    } else {
      throw new ConflictException('User not found');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
