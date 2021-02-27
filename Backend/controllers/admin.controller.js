const db = require('../models');
const company = db.company;
const student = db.student;
const Op = db.Sequelize.Op;
const kafka = require('../kafka/client');

exports.reviewsPerDay = (req, res) => {
  kafka.make_request(
    'review_topic',
    {
      path: 'reviewsPerDay',
    },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results);
        // res.writeHead(200, { "Content-Type": "aplication/json" });
        res.send(results);
      }
    }
  );
};

exports.mostReviewed = (req, res) => {
  company
    .findAll()
    .then((data) => {
      var dict = {};
      for (each of data) {
        dict[each.id] = each;
      }
      kafka.make_request(
        'review_topic',
        {
          path: 'mostReviewed',
          body: dict,
        },
        function (err, results) {
          if (err) {
            console.log('Inside err');
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Some error has occured');
          } else {
            console.log(results);
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

exports.topRated = (req, res) => {
  company
    .findAll()
    .then((data) => {
      var dict = {};
      for (each of data) {
        dict[each.id] = each;
      }
      kafka.make_request(
        'review_topic',
        {
          path: 'topRated',
          body: dict,
        },
        function (err, results) {
          if (err) {
            console.log('Inside err');
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Some error has occured');
          } else {
            console.log(results);
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

exports.topStudents = (req, res) => {
  kafka.make_request(
    'review_topic',
    {
      path: 'topStudents',
    },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log('in backend:', results);
        console.log('helper:', Object.keys(results));
        let id_array = Object.keys(results);
        student
          .findAll({
            where: { id: id_array },
          })
          .then((data) => {
            console.log('type', typeof data);
            console.log('data with name:', data);

            let names = [];
            let number = [];

            for (each of data) {
              console.log('Each:', each.dataValues.id);
              each.dataValues.number = results[each.dataValues.id];
            }

            console.log(typeof data);
            console.log('Before sort', data);

            data.sort(function (a, b) {
              return b.dataValues.number - a.dataValues.number;
            });
            for (each of data) {
              names.push(
                each.dataValues.first_name + each.dataValues.last_name
              );
              number.push(results[each.dataValues.id]);
            }
            console.log('After sort', data);
            let final_output = { name: names, number: number };
            res.send(final_output);
          });
      }
    }
  );
};

exports.topCeo = (req, res) => {
  company
    .findAll()
    .then((data) => {
      var dict = {};
      for (each of data) {
        dict[each.id] = each;
      }
      kafka.make_request(
        'review_topic',
        {
          path: 'topCeo',
          body: dict,
        },
        function (err, results) {
          if (err) {
            console.log('Inside err');
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Some error has occured');
          } else {
            console.log(results);
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

exports.topVisits = (req, res) => {
  kafka.make_request(
    'photos_topic',
    {
      path: 'topVisits',
    },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log('in top visits backend:', results);
        console.log('helper:', Object.keys(results));
        let id_array = Object.keys(results);
        company
          .findAll({
            where: { id: id_array },
          })
          .then((data) => {
            console.log('type', typeof data);
            console.log('data with name:', data);
            let names = [];
            let number = [];
            for (each of data) {
              console.log('Each:', each.dataValues.id);
              each.dataValues.noOfViews = results[each.dataValues.id];
            }
            console.log(typeof data);
            console.log('Before sort', data);
            data.sort(function (a, b) {
              return b.dataValues.noOfViews - a.dataValues.noOfViews;
            });
            for (each of data) {
              names.push(each.dataValues.name);
              number.push(results[each.dataValues.id]);
            }
            console.log('After sort', data);
            let final_output = { name: names, number: number };
            res.send(final_output);
          });
      }
    }
  );
};
