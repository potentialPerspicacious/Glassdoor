const db = require('../models');
const student = db.student;
const company = db.company;
const Op = db.Sequelize.Op;
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/db.config');
const { auth } = require('../config/passport');
auth();

exports.create = (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: 'Content cannot be empty!',
    });
    return;
  }
  let hashedPassword = passwordHash.generate(req.body.password);

  const c = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword,
  };

  student
    .create(c)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the account.',
      });
    });
};

exports.validate = (req, res) => {
  const email = req.body.email;
  const pwd = req.body.password;
  if (email === 'admin') {
    if (pwd === 'admin123') {
      const payload = { type: 'admin' };
      const token = jwt.sign(payload, secret, {
        expiresIn: 1008000,
      });
      res.status(200).send('JWT ' + token);
    } else {
      res.status(401).send({
        message: 'INVALID_CREDENTIALS',
      });
    }
  }
  var condition = email ? { email: { [Op.eq]: `${email}` } } : null;
  console.log('email and pwd:', email, pwd, condition);

  student
    .findOne({ where: condition })
    .then((data) => {
      console.log('data:', data);
      if (!data) {
        company.findOne({ where: condition }).then((data) => {
          console.log('data:', data);
          if (!data) {
            res.status(401).send({
              message: 'INVALID_CREDENTIALS',
            });
          } else if (passwordHash.verify(pwd, data.dataValues.password)) {
            const payload = {
              id: data.id,
              email: data.email,
              name: data.name,
              type: 'company',
            };
            const token = jwt.sign(payload, secret, {
              expiresIn: 1008000,
            });
            res.status(200).send('JWT ' + token);
          } else {
            res.status(401).send({
              message: 'INVALID_CREDENTIALS',
            });
          }
        });
      } else if (passwordHash.verify(pwd, data.dataValues.password)) {
        const payload = {
          id: data.id,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          type: 'student',
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).send('JWT ' + token);
      } else {
        res.status(401).send({
          message: 'INVALID_CREDENTIALS',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while logging in.',
      });
    });
};
