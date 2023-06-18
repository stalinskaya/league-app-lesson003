import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseService } from '../base/base.service';
import { UserModel, UserSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: BaseService,
      useClass: UsersService,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
