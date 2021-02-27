const express = require("express");
const router = express.Router();
//const passwordHash = require('password-hash');
//const pool = require('../../pool');
var kafka = require('../../kafka/client');
var { checkAuth } = require('../../config/passport');
//const Company = require('../../models/company_mongo.model');


router.get('/:company_id', checkAuth, (req, res) => {
    kafka.make_request("companyProfile_topic", { "path": "getCompanyDetails", "body": req.params.company_id}, function (err, results) {
      console.log(results);
      console.log("In make request call back", results);
      if (err) {
        console.log("Inside err");
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
    })
  })

  router.post('/update/:company_id', checkAuth, (req, res) => {
    console.log(req.params.company_id)
    kafka.make_request("companyProfile_topic", { "path": "companyUpdate", "company_id": req.params.company_id, "street": req.body.street, "city": req.body.city,
  "state": req.body.state, "website": req.body.website, "company_size": req.body.company_size, "company_type": req.body.company_type, "revenue": req.body.revenue,
  "headquarters": req.body.headquarters, "industry": req.body.industry, "founded": req.body.founded, "mission": req.body.mission, 
  "ceo_name": req.body.ceo_name, "cphoto_file_name": req.body.cphoto_file_name
 }, function (err, results) {
      console.log(results);
      console.log("In make request call back", results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        //console.log("Inside else", results);
        if (results.status === 200) {
          return res.end(results.message);
        } else {
          return res.end(results.message);
        }
      }
    })
    });

    module.exports=router;