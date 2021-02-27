const db = require('../models');
const company = db.company;
const Op = db.Sequelize.Op;
const passwordHash = require('password-hash');
const kafka = require('../kafka/client');

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content cannot be empty!',
    });
    return;
  }
  let hashedPassword = passwordHash.generate(req.body.password);

  const c = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  company
    .create(c)
    .then((data) => {
      let msg = { status: 'SUCCESS' };
      res.send(msg);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the account.',
      });
    });
};

exports.search = (req, res) => {
  var company_name = req.body.company_name;

  var condition = { name: { [Op.like]: `%${company_name}%` } };
  company
    .findAll({ where: condition })
    .then((data) => {
      var dict = {};
      for (each of data) {
        dict[each.id] = each;
      }
      kafka.make_request(
        'search_topic',
        {
          path: 'searchByCompany',
          body: dict,
          page: req.query.page,
        },
        function (err, results) {
          if (err) {
            console.log('Inside err');
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Some error has occured');
          } else {
            // console.log(results);
            // res.writeHead(200, { "Content-Type": "aplication/json" });
            res.send(results);
          }
        }
      );
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving companies.',
      });
    });
};

exports.searchInterview = (req, res) => {
  var company_name = req.body.company_name;

  var condition = { name: { [Op.like]: `%${company_name}%` } };
  company
    .findAll({ where: condition })
    .then((data) => {
      var dict = {};
      for (each of data) {
        dict[each.id] = each;
      }
      kafka.make_request(
        'interview_topic',
        {
          path: 'searchByInterview',
          body: dict,
          page: req.query.page,
        },
        function (err, results) {
          if (err) {
            console.log('Inside err');
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Some error has occured');
          } else {
            console.log(results);
            // res.writeHead(200, { 'Content-Type': 'aplication/json' });
            res.send(results);
          }
        }
      );
      // res.send(dict);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving companies.',
      });
    });
};

exports.searchSalary = (req, res) => {
  var company_name = req.body.company_name;

  var condition = { name: { [Op.like]: `%${company_name}%` } };
  company
    .findAll({ where: condition })
    .then((data) => {
      var dict = {};
      for (each of data) {
        dict[each.id] = each;
      }
      kafka.make_request(
        'salary_topic',
        {
          path: 'searchBySalary',
          body: dict,
          page: req.query.page,
        },
        function (err, results) {
          if (err) {
            console.log('Inside err');
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Some error has occured');
          } else {
            console.log(results);
            // res.writeHead(200, { 'Content-Type': 'aplication/json' });
            res.send(results);
          }
        }
      );
      // res.send(dict);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving companies.',
      });
    });
};
