const Interview = require('../models/interview');
const paginate = require('jw-paginate');
const sqlDB = require('../config/sqlConfig');

module.exports.interviewService = function (msg, callback) {
  console.log('In Interview service path', msg.path);
  switch (msg.path) {
    case 'add_interview':
      addInterview(msg, callback);
      break;
    case 'get_all_interviews':
      getAllInterviewsForCompany(msg, callback);
      break;
    case 'searchByInterview':
      searchByCompanyInterview(msg, callback);
      break;
    case 'getStudentReviews':
      getStudentReviews(msg, callback);
      break;
  }
};

async function addInterview(msg, callback) {
  let err = {};
  let response = {};
  console.log('In add Interview topic service. Msg: ', msg);
  let companyId = '';
  let sql = `Call get_sqlCompanyId('${msg.body.companyName}');`;
  try {
    sqlDB.query(sql, async (err, result) => {
      if (err) {
        error.message = err;
        error.status = 500;
        return callback(null, error);
      } else {
        companyId = result[0][0].id;
        let interview_q_a_list = [];
        for (let i = 0; i < msg.body.qa.length; i++) {
          let q = msg.body.qa[i];
          let ans = {
            answer: q.answer,
            sql_student_id: msg.body.sql_student_id,
          };
          let obj = {
            question: q.question,
            answers: [ans],
          };
          interview_q_a_list.push(obj);
        }
        let iObj = new Interview({
          sql_company_id: companyId,
          sql_student_id: msg.body.sql_student_id,
          companyName: msg.body.companyName,
          overall_experience: msg.body.overall_experience,
          job_title: msg.body.job_title,
          description: msg.body.description,
          difficulty: msg.body.difficulty,
          offer_status: msg.body.offer_status,
          interview_date: new Date(Date.now()),
          interview_q_a: interview_q_a_list,
        });
        let newInterview = await iObj.save();
        if (!newInterview) {
          response.status = 500;
          response.data = 'Data error';
          return callback(null, response);
        } else {
          response.status = 200;
          response.message = 'Inserted Successfully';
          response.data = JSON.stringify(newInterview);
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

async function getAllInterviewsForCompany(msg, callback) {
  let err = {};
  let response = {};
  console.log('get All Interviews: ', msg.body);
  console.log(msg.body.company_id);
  try {
    let interview = await Interview.find({
      sql_company_id: msg.body.company_id,
    });
    console.log('response:');
    console.log(response);
    if (interview && interview.length > 0) {
      response.status = 200;
      response.data = JSON.stringify(interview);
      return callback(null, response);
    } else {
      response.status = 200;
      response.data = 'NO_RECORD';
      return callback(null, response);
    }
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = 'Error in Data';
    return callback(err, null);
  }
}

async function searchByCompanyInterview(msg, callback) {
  console.log('In search by interview for a company: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  var final_result = {};
  const page = parseInt(msg.page) || 1;
  await Interview.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: '$sql_company_id',
          interviews: { $sum: 1 },
          rating: { $avg: '$difficulty' },
        },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      for (var each of results) {
        msg.body[each._id].interviews = each.interviews;
        msg.body[each._id].rating = each.rating;
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

async function getStudentReviews(msg, callback) {
  let err = {},
    response = {};
  console.log('get Student Interviews: ', msg);
  await Interview.find({ sql_student_id: msg.userId }, (result, error) => {
    if (error) {
      err.message = error;
      err.status = 500;
      return callback(null, error);
    } else if (result) {
      response.status = 200;
      response.message = 'STUDENT_INTERVIEWS';
      response.data = JSON.stringify(result);
      return callback(null, response);
    }
  });
}
