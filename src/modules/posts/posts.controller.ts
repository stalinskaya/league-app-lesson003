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
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BaseService } from '../base/base.service';
import { PostModel } from './post.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: BaseService<
      PostModel,
      CreatePostDto,
      UpdatePostDto
    >,
  ) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
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
