import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ example: 'Test' })
  name: string;
  @ApiProperty({ example: 0 })
  likes: number;
  @ApiProperty({ example: 0 })
  rate: number;
}
