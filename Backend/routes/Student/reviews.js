const express = require('express');
const kafka = require('../../kafka/client');
const router = express.Router();
var { checkAuth } = require('../../config/passport');

router.post('/', (req, res) => {
  console.log('In company profile reviews route');
  console.log(req.body);
  kafka.make_request(
    'review_topic',
    {
      path: 'insertReviewDetails',
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
    },
  );
});

router.get('/:companyName',checkAuth, (req, res) => {
    console.log('In company profile reviews route');
    console.log(req.params.companyName);
    kafka.make_request(
      'review_topic',
      {
        path: 'getReviewDetails',
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
      },
    );
  });

module.exports = router;
