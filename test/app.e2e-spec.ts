import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthDto } from 'src/modules/auth/dto/AuthDto';
import { faker } from '@faker-js/faker';
import { CreatePostDto } from 'src/modules/posts/dto/create-post.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/hello');
    expect(response.body).toEqual({ message: 'Hello world' });
  });

  // it('Registration - post method', async () => {
  //   const requestRegistration: AuthDto = {
  //     username: faker.person.fullName(),
  //     password: faker.internet.password(),
  //   };
  //   const response = await request(app.getHttpServer())
  //     .post('/auth/register')
  //     .send(requestRegistration);
  //   expect(response.status).toEqual(201);
  // });

  it('Login - post method', async () => {
    const requestRegistration: AuthDto = {
      username: 'yana1234',
      password: 'testingTst',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(requestRegistration);
    expect(response.status).toEqual(201);
  });
});
