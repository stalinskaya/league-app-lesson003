import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreatePostDto } from 'src/modules/posts/dto/create-post.dto';
import { AppModule } from './../src/app.module';

describe('PostsController', () => {
  let app: INestApplication;

  let token = '';
  let curr_user_id = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'yana1234',
        password: 'testingTst',
      });

    // we'll need the token for future requests
    token = response.body.access_token;

    // we'll need the user_id for future requests
    curr_user_id = 'test';
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/posts');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('Forbidden route - create post', async () => {
    const requestCreatePost: CreatePostDto = {
      name: 'Test',
      authorid: '',
    };
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send(requestCreatePost);
    expect(response.status).toEqual(403);
  });

  it('Allowed route - create post', async () => {
    const requestCreatePost: CreatePostDto = {
      name: 'Test',
      authorid: '',
    };
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send(requestCreatePost)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
});
