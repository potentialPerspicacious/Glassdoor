const express = require('express');
const kafka = require('../../kafka/client');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var { checkAuth } = require('../../config/passport');

// Cover letter
const cover_storage = multer.diskStorage({
  destination:
    path.join(__dirname, '../..') + '/public/uploads/student/coverletter',
  filename: (req, file, cb) => {
    console.log('multer');
    console.log(req.body);
    cb(
      null,
      'student' +
        req.params.id +
        '-' +
        'coverletter' +
        '-' +
        Date.now() +
        'nameSplitter' +
        file.originalname
    );
  },
});

const uploadCoverLetter = multer({
  storage: cover_storage,
  limits: { fileSize: 1000000 },
}).single('cover_file');

router.post('/apply/:id', checkAuth, (req, res) => {
  console.log('In apply JOB route');
  uploadCoverLetter(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      console.log(req.body);
      kafka.make_request(
        'jobs_topic',
        {
          path: 'apply_job',
          body: req.body,
          coverletter: req.file.filename,
        },
        function (err, results) {
          console.log('In make request call back', results);
          if (err) {
            console.log('Inside err');
            return res.status(err.status).send('Some error has occured');
          } else {
            console.log('Inside Student cover data');
            return res.status(results.status).send(results.message);
          }
        }
      );
    }
  });
});

router.get('/all', checkAuth, (req, res) => {
  console.log('Get all jobs');
  kafka.make_request(
    'jobs_topic',
    { path: 'getJobs' },
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

router.get('/:companyName',checkAuth, (req, res) => {
  console.log('In company jobs route');
  console.log(req.params.companyName);
  kafka.make_request(
    'jobs_topic',
    {
      path: 'getAllJobs',
      body: req.params.companyName,
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
        res.end(JSON.stringify(results.data));
      }
    }
    );
  });
router.get('/search/:search_param', checkAuth, (req, res) => {
  console.log('Search jobs');
  console.log(req.params);
  kafka.make_request(
    'jobs_topic',
    { path: 'search_job_home', body: req.params },
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

router.get('/getMyJobs/:student_id', checkAuth, (req, res) => {
  console.log('Get my applied jobs');
  console.log(req.params);
  kafka.make_request(
    'jobs_topic',
    { path: 'applied_jobs', body: req.params },
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
module.exports = router;
