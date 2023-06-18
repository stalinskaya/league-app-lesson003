import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../base/base.model';

export type PostDocument = HydratedDocument<PostModel>;

@Schema()
export class PostModel extends BaseModel {
  @Prop()
  name: string;
  @Prop()
  likes: number;
  @Prop()
  rate: number;
  @Prop()
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
