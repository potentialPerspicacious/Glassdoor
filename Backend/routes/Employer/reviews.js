const express = require("express");
const router = express.Router();
//const Company = require('../../models/company_mongo.model');
//const reviews = require('../../models/reviews_mongo.model');
var kafka = require('../../kafka/client');
var { checkAuth } = require('../../config/passport');
//const redisClient = require('../../redisConfig');

router.get('/:companyName', (req, res) => {
    console.log(req.params.companyName)
  kafka.make_request("review_topic", { "path": "companyReviews", "body": req.params.companyName }, function (err, results) {
    console.log(results);
    console.log("In make request call back", results);
    if (err) {
      console.log("Inside err");
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
  })
})

router.post('/favourite', (req, res) => {
  console.log(req.body)
kafka.make_request("review_topic", { "path": "updateFavFeatured", "id": req.body.id, "colValue": req.body.value }, function (err, results) {
  console.log(results);
  console.log("In make request call back", results);
  if (err) {
    console.log("Inside err");
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
})
})

router.get('/featured/:companyName',checkAuth, (req, res) => {
  console.log('In company profile reviews route');
  console.log(req.params.companyName);
  kafka.make_request(
    'review_topic',
    {
      path: 'getFeaturedReview',
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
router.get('/positive/:companyName',checkAuth, (req, res) => {
  console.log('In company profile reviews route');
  console.log(req.params.companyName);
  kafka.make_request(
    'review_topic',
    {
      path: 'getPositiveReview',
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
router.get('/negative/:companyName',checkAuth, (req, res) => {
  console.log('In company profile reviews route');
  console.log(req.params.companyName);
  kafka.make_request(
    'review_topic',
    {
      path: 'getNegativeReview',
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
router.get('/rating/:companyName',checkAuth, (req, res) => {
  console.log('In company profile reviews route');
  console.log(req.params.companyName);
  kafka.make_request(
    'review_topic',
    {
      path: 'getOverallRating',
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
module.exports=router;