import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export abstract class BaseModel {
  @Prop()
  name: string;
}
