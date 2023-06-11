import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { BaseService } from '../base/base.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [
    {
      provide: BaseService,
      useClass: CommentsService,
    },
  ],
})
export class CommentsModule {}
