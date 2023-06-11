import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BaseService } from '../base/base.service';
import { CommentModel } from './comment.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService extends BaseService<
  CommentModel,
  CreateCommentDto,
  UpdateCommentDto
> {
  constructor(
    @InjectModel(CommentModel.name)
    private readonly commentModel: Model<CommentModel>,
  ) {
    super(commentModel);
  }
}
