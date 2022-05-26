import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from '@/database/databse.service';
import { SignInAuthDto, SignUpAuthDto } from '@/auth/dto';
import { UpdateDto } from '@/administration/dto';
import {
  SemesterRegDto,
  SemesterTitleDto,
  StudentEmailDto,
  StudentIdDto,
} from '@/students/dto';
import { StudentReturnType } from '@/administration/Utils';

describe('App e2e', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3080);
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });

  afterAll(() => {
    dbConnection.collection('students').deleteMany({});
    dbConnection.collection('users').deleteMany({});
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      const dto: SignUpAuthDto = {
        email: 'messy@gmail.com',
        name: {
          firstname: 'messy',
          lastname: 'wambua',
        },
        user_Id: 'ict-341',
        password: 'messydev',
      };
      it('should signup', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      const dto: SignInAuthDto = {
        email: 'messy@gmail.com',
        password: 'messydev',
      };
      it('should signin', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('Admin', () => {
    describe('view users', () => {
      it('should return users', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/admin/all_users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
    describe('update status', () => {
      const dto: UpdateDto = {
        email: 'messy@gmail.com',
        role: 'Student',
      };
      console.log(dto);
      it('should update user', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/admin/update_user')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(202)
          .inspect();
      });
    });

    describe('get all students', () => {
      it('should return all students', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/admin/students')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(302)
          .inspect();
      });
    });
    describe('get student by id', () => {
      const dto: StudentIdDto = {
        user_Id: 'ict-341',
      };

      it('should get student by Id', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/admin/student')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(302)
          .inspect();
      });
    });
  });

  describe('Student', () => {
    describe('get student profile', () => {
      const dto: StudentEmailDto = {
        email: 'messy@gmail.com',
      };
      it('get student details', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/student/profile')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(302)
          .inspect();
      });
    });

    describe('register new semester', () => {
      const dto: SemesterRegDto = {
        user_Id: 'ict-341',
        semester: 'semester one year one',
        status: 'pending',
        date: 20220305,
        units: [
          {
            name: 'forensics',
            code: 'fc 100',
            status: 'pending',
          },
        ],
        fee: [],
      };

      it('should register new semester', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/student/register_semester')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(202)
          .inspect();
      });

      it('should fail registration of duplicate semester', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/student/register_semester')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectBodyContains('status')
          .expectStatus(202)
          .inspect();
      });
    });

    describe('check active semesters', () => {
      const dto: StudentIdDto = {
        user_Id: 'ict-341',
      };
      it('should return registered semesters', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/student/check_active_semester')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(302)
          .inspect();
      });
    });

    describe('should get semester by title', () => {
      const dto: SemesterTitleDto = {
        user_Id: 'ict-341',
        title: 'semester one year one',
      };
      it('should return semester  defined by the title', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/student/get_semester')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(302)
          .inspect();
      });
    });
  });
});
