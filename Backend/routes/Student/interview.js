const express = require('express');
const kafka = require('../../kafka/client');
const router = express.Router();
var { checkAuth } = require('../../config/passport');

router.post('/add', checkAuth, (req, res) => {
  console.log('In interview route');
  console.log(req.body);
  kafka.make_request(
    'interview_topic',
    {
      path: 'add_interview',
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

router.get('/get/:company_id', checkAuth, (req, res) => {
  console.log(req.params.user_id);
  kafka.make_request(
    'interview_topic',
    { path: 'get_all_interviews', body: req.params },
    function (err, results) {
      if (err) {
        console.log('error');
        console.log(err);
        res.writeHead(err.status, {
          'Content-Type': 'text/plain',
        });
        res.end(err.data);
      } else {
        console.log('done');
        res.writeHead(results.status, {
          'Content-Type': 'text/plain',
        });
        res.end(results.data);
      }
    }
  );
});

module.exports = router;
