import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Headers,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BaseService } from '../base/base.service';
import { PostModel } from './post.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: BaseService<
      PostModel,
      CreatePostDto,
      UpdatePostDto
    >,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  async create(
    @Headers('Authorization') auth: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.create({
      name: createPostDto.name,
      authorid: (await this.authService.me(auth)).id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePostDto) {
    return this.postService.update(id, updateDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
