import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../base/base.controller';
import { CommentModel } from '../comments/comment.model';
import { BaseService } from '../base/base.service';

@ApiTags('comments')
@Controller('comments')
export class CommentsController extends BaseController<
  CommentModel,
  CreateCommentDto,
  UpdateCommentDto
> {
  constructor(
    private readonly commentsService: BaseService<
      CommentModel,
      CreateCommentDto,
      UpdateCommentDto
    >,
  ) {
    super(commentsService);
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
