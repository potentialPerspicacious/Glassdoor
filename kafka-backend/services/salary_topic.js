'use strict';

const Salary = require('../models/salary');
const sqlDB = require('../config/sqlConfig');
const redisClient = require('../config/redisConfig');
const paginate = require('jw-paginate');

exports.salaryService = function (msg, callback) {
  console.log('In salaryService - path:', msg.path);
  switch (msg.path) {
    case 'insertSalaryDetails':
      insertSalaryDetails(msg, callback);
      break;
    case 'getSalaryDetails':
      getSalaryDetails(msg, callback);
      break;
    case 'searchBySalary':
      searchBySalary(msg, callback);
      break;
    case 'getStudentSalaries':
      getStudentSalaries(msg, callback);
  }
};

async function getSalaryDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In getSalaryDetails service. Msg: ', msg);
  console.log(msg.body);
  Salary.aggregate([
    {
      $match: {
        company: msg.body,
      },
    },
    {
      $group: {
        _id: { job_title: '$job_title', company: '$company' },
        base_salary: { $avg: '$base_salary' },
        bonus: { $avg: '$bonus' },
      },
    },
  ])
    .then((user) => {
      console.log(user);
      console.log('average salary');
      response.status = 200;
      response.data = user;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function insertSalaryDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In add Interview topic service. Msg: ', msg);
  let companyId = '';
  let sql = `Call get_sqlCompanyId('${msg.body.company}');`;
  try {
    sqlDB.query(sql, async (err, result) => {
      if (err) {
        error.message = err;
        error.status = 500;
        return callback(null, error);
      } else {
        console.log(result)
        companyId = result[0][0].id;

        let iObj = new Salary({
          sql_company_id: companyId,
          sql_student_id: msg.body.sql_student_id,
          base_salary: msg.body.base_salary,
          currancy: msg.body.currancy,
          bonus: msg.body.bonus,
          job_title: msg.body.job_title,
          year_of_experience: msg.body.year_of_experience,
          location: msg.body.location,
          company: msg.body.company,
        });
        console.log(iObj);
        let newSalary = await iObj.save();
        if (!newSalary) {
          response.status = 500;
          response.data = 'Data error';
          response.message = 'Data error';
          return callback(null, response);
        } else {
          response.status = 200;
          response.message = 'Inserted Successfully';
          response.data = JSON.stringify(newSalary);
          return callback(null, response);
        }
      }
    });
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = 'Error in Data';
    return callback(err, null);
  }
}

async function searchBySalary(msg, callback) {
  console.log('In search by salary for a company: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  var final_result = {};
  const page = parseInt(msg.page) || 1;
  await Salary.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: '$sql_company_id',
          salaries: { $sum: 1 },
        },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      for (var each of results) {
        msg.body[each._id].salaries = each.salaries;
      }
      console.log('msg.body:', msg.body);
      const pager = paginate(ids.length, page, 5);
      const pageOfItems = Object.keys(msg.body)
        .slice(pager.startIndex, pager.endIndex + 1)
        .map((key) => msg.body[key]);
      final_result = { pager: pager, items: pageOfItems };
    }
  );

  callback(null, final_result);
  // .find({ sql_company_id: { $in: ids } }, function (err, result) {
  //   console.log("reviews list:", result);
  //   callback(null, result);
  // });
}

async function getStudentSalaries(msg, callback) {
  let err = {},
    response = {};
  console.log('get Student Interviews: ', msg);
  await Salary.find({ sql_student_id: msg.userId }, (result, error) => {
    if (error) {
      err.message = error;
      err.status = 500;
      return callback(null, error);
    } else if (result) {
      response.status = 200;
      response.message = 'ABOUT_ME';
      response.data = JSON.stringify(result);
      return callback(null, response);
    }
  });
}
