import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ example: 'Test' })
  name: string;
  @ApiProperty({ example: 0 })
  likes: number;
  @ApiProperty({ example: 0 })
  rate: number;
}
