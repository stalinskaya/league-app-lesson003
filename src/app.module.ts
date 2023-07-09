import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenMiddleware } from './modules/auth/token.middleware';
import { CoreModule } from './core.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:password@localhost:7500'),
    PostsModule,
    CommentsModule,
    UsersModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*');
  }
}
