import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const newUser = new ListUserDto(user.id, user.name);
    return newUser;
  }
  @Get()
  @ApiOperation({ summary: 'List all users' })
  listAll() {
    return this.userService.findAll();
  }

  // TODO: implement update, delete, get by id/email endpoints
}
