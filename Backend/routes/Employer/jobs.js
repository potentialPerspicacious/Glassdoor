const express = require('express');
const kafka = require('../../kafka/client');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('In company profile jobs route');
  console.log(req.body);
  kafka.make_request(
    'jobs_topic',
    {
      path: 'insertJobDetails',
      body: req.body,
    },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(results.message);
      }
    }
  );
});

router.get('/:companyname/fetchjobs', (req, res) => {
  console.log('In company profile jobs route');
  kafka.make_request(
    'jobs_topic',
    { path: 'getAllJobs', body: req.params.companyname },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(results.data));
      }
    }
  );
});

router.post('/search/job', (req, res) => {
  console.log('In company profile jobs to search');
  kafka.make_request(
    'jobs_topic',
    { path: 'searchJob', body: req.body, page: req.query.page },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results.data));
      }
    }
  );
});

router.get('/:job_id/applicantdetails', (req, res) => {
  console.log('In company profile jobs route');
  kafka.make_request(
    'jobs_topic',
    { path: 'getJobApplicants', body: req.params.job_id },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(results.data[0]));
      }
    }
  );
});

router.post('/applicantstatus/update', (req, res) => {
  console.log('In company profile jobs route');
  console.log(req.body);
  kafka.make_request(
    'jobs_topic',
    {
      path: 'updateApplicantStatus',
      body: req.body,
    },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(results.message);
      }
    }
  );
});

router.get('/:title/fetchStatistics', (req, res) => {
  console.log('In company profile jobs route');
  kafka.make_request(
    'jobs_topic',
    { path: 'getJobsStatistics', body: req.params.title },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results.data);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(results.data));
      }
    }
  );
});
module.exports = router;

router.post('/getDemographics', (req, res) => {
  console.log('In you shall trust');
  console.log(req.body);
  kafka.make_request(
    'jobs_topic',
    { path: 'getDemographics', body: req.body },
    function (err, results) {
      console.log(results);
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        //console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    }
  );
});
module.exports = router;
