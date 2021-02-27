let assert = require('chai').assert;
let app = require('../index');
let chai = require('chai');
let expect = require('chai').expect;

chai.use(require('chai-http'));
let agent = require('chai').request.agent(app);

describe('Company Signup with existing email ', () => {
  it('Company signup', () => {
    agent
      .post('/company/register')
      .send({
        name: 'Google',
        email: 'google@gmail.com',
        password: 'google123',
      })
      .then(function (res) {
        console.log('User alredy exists');
        expect(res.status).to.equal(500);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe('Search by company name', () => {
  it('Search by company name', () => {
    agent
      .post('/company/search/company')
      .send({
        company_name: 'mic',
      })
      .set(
        'Authorization',
        'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyaWNoYXJkLmZleW5tYW5AZ2xhc3Nkb29yLmNvbSIsImZpcnN0X25hbWUiOiJSaWNoYXJkIiwibGFzdF9uYW1lIjoiRmV5bm1hbiB0aGUgZ3JlYXQiLCJ0eXBlIjoic3R1ZGVudCIsImlhdCI6MTYwNzEzMzUxNSwiZXhwIjoxNjA4MTQxNTE1fQ.nY7SEoF2osWuI16lJ2m2K_h3GnhfGFriPXQatWFQkto'
      )
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe('Search for salary without logging in', () => {
  it('earch for salary without logging in', () => {
    agent
      .post('/company/search/salary')
      .send({
        company_name: 'mic',
      })

      .then(function (res) {
        expect(res.status).to.equal(401);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe('Application status update', () => {
  it('Application status update', () => {
    agent
      .post('/glassdoor/jobs/applicantstatus/update')
      .send({
        _id: '5fc9e6e2a920550f14a803d9',
        status: 'Reviewed',
      })
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe('Fetch salary', () => {
  it('Fetch salary', () => {
    agent
      .get('/student/salary/Google')

      .set(
        'Authorization',
        'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyaWNoYXJkLmZleW5tYW5AZ2xhc3Nkb29yLmNvbSIsImZpcnN0X25hbWUiOiJSaWNoYXJkIiwibGFzdF9uYW1lIjoiRmV5bm1hbiB0aGUgZ3JlYXQiLCJ0eXBlIjoic3R1ZGVudCIsImlhdCI6MTYwNzEzMzUxNSwiZXhwIjoxNjA4MTQxNTE1fQ.nY7SEoF2osWuI16lJ2m2K_h3GnhfGFriPXQatWFQkto'
      )
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe('Get jobs', () => {
  it('Get jobs', () => {
    agent
      .get('/student/job/getMyJobs/20007')

      .set(
        'Authorization',
        'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyaWNoYXJkLmZleW5tYW5AZ2xhc3Nkb29yLmNvbSIsImZpcnN0X25hbWUiOiJSaWNoYXJkIiwibGFzdF9uYW1lIjoiRmV5bm1hbiB0aGUgZ3JlYXQiLCJ0eXBlIjoic3R1ZGVudCIsImlhdCI6MTYwNzEzMzUxNSwiZXhwIjoxNjA4MTQxNTE1fQ.nY7SEoF2osWuI16lJ2m2K_h3GnhfGFriPXQatWFQkto'
      )
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe('Get interview', () => {
  it('Get interview', () => {
    agent
      .get('/student/interview/get/2')
      .set(
        'Authorization',
        'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyaWNoYXJkLmZleW5tYW5AZ2xhc3Nkb29yLmNvbSIsImZpcnN0X25hbWUiOiJSaWNoYXJkIiwibGFzdF9uYW1lIjoiRmV5bm1hbiB0aGUgZ3JlYXQiLCJ0eXBlIjoic3R1ZGVudCIsImlhdCI6MTYwNzEzMzUxNSwiZXhwIjoxNjA4MTQxNTE1fQ.nY7SEoF2osWuI16lJ2m2K_h3GnhfGFriPXQatWFQkto'
      )
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe('Delete resume', () => {
  it('Delete resume', () => {
    agent
      .post('/student/deleteResume/5fc7d810e822fab090fd4484')
      .send({
        resume: 'student2-resume-1607134798775nameSplitterresume_test.pdf',
        is_primary: false,
      })
      .set(
        'Authorization',
        'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyaWNoYXJkLmZleW5tYW5AZ2xhc3Nkb29yLmNvbSIsImZpcnN0X25hbWUiOiJSaWNoYXJkIiwibGFzdF9uYW1lIjoiRmV5bm1hbiB0aGUgZ3JlYXQiLCJ0eXBlIjoic3R1ZGVudCIsImlhdCI6MTYwNzEzMzUxNSwiZXhwIjoxNjA4MTQxNTE1fQ.nY7SEoF2osWuI16lJ2m2K_h3GnhfGFriPXQatWFQkto'
      )
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe('Most visited companies', () => {
  it('Most visited companies ', () => {
    agent
      .get('/admin/topvisits')
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe('Get company profile', () => {
  it('Get company profile', () => {
    agent
      .get('/company/profile/1')
      .set(
        'Authorization',
        'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnb29nbGVAZ21haWwuY29tIiwibmFtZSI6Ikdvb2dsZSIsInR5cGUiOiJjb21wYW55IiwiaWF0IjoxNjA3MTM2MTQxLCJleHAiOjE2MDgxNDQxNDF9.KifCznA_-mnY-M1zOjB12PyvNrs1OrTI1dcfpQgjFAA'
      )
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
