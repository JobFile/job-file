const request = require('supertest');
const fs = require('fs');
const path = require('path');
const db = require('../server/models');

const server = 'http://localhost:3000';

// const { Pool } = require('pg');
// // TODO: require db
// // require('dotenv').config();

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

// // const testPool = new Pool({
// //   connectionString:
// // });

// const testDb = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return newPool.query(text, params, callback);
//   }
// };

const userID = 15;
const testQuery = `SELECT job_id, user_id, job_role, company_name, 
phone, email, contact_name, job_link, status 
FROM jobs 
WHERE user_id = $1`;
const testParams = [userID];

// const getTestQuery = async () => {
//   const res = await db.query(testQuery, testParams);
//   return res;
// };

// const testData = getTestQuery();
// console.log('testData', testData);

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/users', () => {
    const testUserInfo = {
      firstName: 'Test',
      lastName: 'Name',
      email: 'test@db.com',
      password: 'test123',
    };

    const testObj = {
      first_name: testUserInfo['firstName'],
      last_name: testUserInfo['lastName'],
      email: testUserInfo['email'],
    };

    describe('POST', () => {
      it('Creates a new user by inserting user info into SQL database', () => {
        return request(server)
          .post('/users')
          .send(testUserInfo)
          .expect(200)
          .then(async (res) => {
            // console.log('res.body', res.body);
            const { first_name, last_name, email } = res.body;
            expect({ first_name, last_name, email }).toEqual(testObj);
          });
        // const res = await request(server).post('/users').send(testUserInfo);
        // console.log('testInfo', testUserInfo);
        // console.log('res.body', res.body);
        // expect(res.status).toEqual(200);
        // expect(res.body).toEqual(testUserInfo);
      });
    });

    describe('GET', () => {
      it("Successfully sends user's job application info", async () => {
        const res = await request(server).get(`/users/${userID}`);
        // expect('Content-Type', /application\/json/);
        // console.log('res.body', res.body);
        const testData = await db.query(testQuery, testParams);
        expect(res.body).toEqual(testData.rows);
      });
    });
  });

  describe('/jobs', () => {
    const userID = 23;
    let jobID;

    const testJob = {
      job_role: 'Test Role',
      company_name: 'Test Inc.',
      phone: '1-800-TEST-NOW',
      email: 'test123@test.com',
      contact_name: 'Test Name',
      job_link: 'www.test.com/test',
      status: 'testing',
      user_id: userID,
    };

    const newTestStatus = { newStatus: 'still testing' };

    let newTestJob;

    const updatedTestJob = {
      job_role: 'Updated Test Role',
      company_name: 'NewTest Inc.',
      phone: '1-888-NEW-TEST',
      email: 'updatedtest@test.com',
      contact_name: 'Newtest Name',
      job_link: 'www.newtest.com/newtest',
      status: 'new instance of testing',
      user_id: userID,
    };

    describe('POST', () => {
      it('Creates a new job list by inserting job info into SQL database', () => {
        return request(server)
          .post('/jobs')
          .send(testJob)
          .expect(200)
          .then(async (res) => {
            // console.log('res.body', res.body);
            const {
              job_role,
              company_name,
              phone,
              email,
              contact_name,
              job_link,
              status,
              user_id,
              job_id,
            } = res.body;
            jobID = job_id;
            expect({
              job_role,
              company_name,
              phone,
              email,
              contact_name,
              job_link,
              status,
              user_id,
            }).toEqual(testJob);
          });
      });
    });

    describe('PATCH', () => {
      it('Updates existing job list from SQL database', () => {
        return request(server)
          .patch(`/jobs/${jobID}`)
          .send(newTestStatus)
          .expect(200)
          .then(async (res) => {
            console.log('patch res.body', res.body);
            const {
              job_role,
              company_name,
              phone,
              email,
              contact_name,
              job_link,
              status,
              user_id,
            } = res.body;
            newTestJob = { ...testJob, status: newTestStatus.newStatus };
            console.log('newTestJob', newTestJob);
            expect({
              job_role,
              company_name,
              phone,
              email,
              contact_name,
              job_link,
              status,
              user_id,
            }).toEqual(newTestJob);
          });
      });
    });

    // describe('PATCH', () => {
    //   it('Updates all fields of job application record', () => {
    //     return request(server)
    //       .patch(`/jobs/${jobID}`)
    //       .expect(200)
    //       .then(async (res) => {
    //         const {
    //           job_role,
    //           company_name,
    //           phone,
    //           email,
    //           contact_name,
    //           job_link,
    //           status,
    //           user_id,
    //         } = res.body;
    //         expect({
    //           job_role,
    //           company_name,
    //           phone,
    //           email,
    //           contact_name,
    //           job_link,
    //           status,
    //           user_id,
    //         }).toEqual(updatedTestJob);
    //       });
    //   });
    // });

    describe('DELETE', () => {
      it('Deletes existing job list from SQL database', () => {
        return request(server)
          .delete(`/jobs/${jobID}`)
          .expect(200)
          .then(async (res) => {
            // console.log('res.body', res.body);
            const {
              job_role,
              company_name,
              phone,
              email,
              contact_name,
              job_link,
              status,
              user_id,
            } = res.body;
            expect({
              job_role,
              company_name,
              phone,
              email,
              contact_name,
              job_link,
              status,
              user_id,
            }).toEqual(newTestJob);
          });
      });
    });
  });
});
