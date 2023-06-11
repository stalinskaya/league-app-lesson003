import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '../base/base.model';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<CommentModel>;

@Schema()
export class CommentModel extends BaseModel {
  @Prop()
  name: string;
  @Prop()
  likes: number;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
