const express = require('express');
const kafka = require('../../kafka/client');
const router = express.Router();

router.get('/allReviews', (req, res) => {
  kafka.make_request(
    'review_topic',
    { path: 'getAllReviews' },
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
          return res.send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    },
  );
});

router.post('/approve', (req, res) => {
  console.log(req.body);
  kafka.make_request(
    'review_topic',
    { path: 'updateApproved', id: req.body.id, body: req.body.value },
    function (err, results) {
      console.log(results);
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        //console.log("Inside else", results);
        if (results.data) {
          return res.send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    },
  );
});

router.get('/allPhotos', (req, res) => {
  kafka.make_request(
    'photos_topic',
    { path: 'getAllPhotos' },
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
          return res.send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    },
  );
});

router.post('/approvePhotos', (req, res) => {
  console.log(req.body);
  kafka.make_request(
    'photos_topic',
    { path: 'approvePhotos', id: req.body.id, body: req.body.value },
    function (err, results) {
      console.log(results);
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        //console.log("Inside else", results);
        if (results.data) {
          return res.send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    },
  );
});

module.exports = router;
