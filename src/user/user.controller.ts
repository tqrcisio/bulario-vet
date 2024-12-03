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

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() userData: CreateUserDto) {
    const createdUser = await this.userService.create(userData);
    const newUser = new ListUserDto(createdUser.id, createdUser.name);
    return newUser;
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  async listAll() {
    return await this.userService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
