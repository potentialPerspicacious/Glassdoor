const Jobs = require('../models/jobs');
const paginate = require('jw-paginate');
const pool = require('../config/sqlConfig');
const redisClient = require('../config/redisConfig');

module.exports.jobsService = function (msg, callback) {
  console.log('In jobs service path', msg.path);
  switch (msg.path) {
    case 'insertJobDetails':
      insertJobDetails(msg, callback);
      break;
    case 'getAllCompanyJobs':
      getAllCompanyJobs(msg, callback);
      break;
    case 'getJobApplicants':
      getJobApplicantsDetails(msg, callback);
      break;
    case 'updateApplicantStatus':
      updateApplicantStatus(msg, callback);
      break;

    case 'getJobsStatistics':
      getJobsStatistics(msg, callback);
      break;

    case 'getAllJobs':
      getAllCompanyJobs(msg, callback);
      break;

    case 'searchJob':
      searchJobTitle(msg, callback);
      break;

    case 'getDemographics':
      getDemographics(msg, callback);
      break;

    case 'getApplicantId':
      getApplicantId(msg, callback);
      break;

    case 'getExploreJobs':
      getExploreJobs(msg, callback);
      break;

    case 'apply_job':
      applyToJob(msg, callback);
      break;

    case 'getAdminJobStatistics':
      getAdminJobStatistics(msg, callback);
      break;

    case 'getJobs':
      getJobs(msg, callback);
      break;

    case 'search_job_home':
      searchJobHome(msg, callback);
      break;

    case 'applied_jobs':
      getStudentAppliedJobs(msg, callback);
      break;

    case 'updateApplicantStatus':
      updateApplicantStatus(msg, callback);
      break;
  }
};

async function insertJobDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In post job details topic service. Msg: ', msg);
  console.log(msg.body);
  await Jobs.create(msg.body)
    .then((data) => {
      response.status = 200;
      response.message = 'Inserted Successfully';
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getAllCompanyJobs(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  await Jobs.find({ companyName: { $regex: msg.body, $options: 'i' } })
    .then((data) => {
      response.status = 200;
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getJobApplicantsDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  await Jobs.find({ _id: msg.body }, { _id: 0, applied_students: 1 })
    .then((data) => {
      response.status = 200;
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateApplicantStatus(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body.status);
  await Jobs.findOneAndUpdate(
    { 'applied_students._id': msg.body._id },
    {
      $set: {
        'applied_students.$.application_status': msg.body.status,
      },
    },
    { safe: true, new: true, useFindAndModify: false }
  )
    .then((data) => {
      response.status = 200;
      response.message = 'Updated';
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}
async function getJobsStatistics(msg, callback) {
  let err = {};
  let response = {};
  let count = {};
  let start = new Date();
  start.setDate(start.getDate() - 365);
  start = start.toLocaleDateString();
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  console.log(start);

  // await Jobs.find({
  //   _id: msg.body,
  //   // posted_date: {$elemMatch: { $lt: 11/29/2019 }},
  // }).count()
  // .then((data) =>
  //   {
  //     count.jobsCount = data
  //   })
  // console.log(response);

  await Jobs.aggregate([
    { $match: { title: msg.body } },
    { $unwind: '$applied_students' },
    { $unwind: { path: '$applied_students.application_status' } },

    {
      $group: {
        _id: '$applied_students.application_status',
        Frequency: { $sum: 1 },
      },
    },
  ]).then((data) => {
    console.log(data);
    count.selectedCount = data;
  });

  await Jobs.find(
    { title: msg.body },
    { 'applied_students.sql_student_id': 1, _id: 0 }
  )
    .then((data) => {
      let applicantId = [];
      for (const key of Object.keys(data[0]._doc)) {
        applicantId = data[0]._doc[key].map((val) => val.sql_student_id);
      }
      console.log(applicantId);
      count.applicantId = applicantId;
    })
    .then(() => {
      console.log(count);
      response.status = 200;
      response.data = count;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function searchJobTitle(msg, callback) {
  let err = {};
  let response = {};

  console.log('In get job search details topic. Msg: ', msg);
  console.log(msg.page);
  const page = parseInt(msg.page) || 1;

  await Jobs.find({ title: { $regex: msg.body.job_title, $options: 'i' } })
    .then((items) => {
      console.log('length:', items.length);
      response.status = 200;
      // response.data = data;
      const pager = paginate(items.length, page, 5);
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      response.data = { pager: pager, items: pageOfItems };
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getApplicantId(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get applicant ID for admin details topic. Msg: ', msg);
  console.log(msg.body);
  await Jobs.find(
    { title: 'Data Scientist, Analytics' },
    { 'applied_students.sql_student_id': 1, _id: 0 }
  )
    .then((data) => {
      let applicantId = [];
      for (const key of Object.keys(data[0]._doc)) {
        applicantId = data[0]._doc[key].map((val) => val.sql_student_id);
      }
      console.log(applicantId);
      response.status = 200;
      response.data = applicantId;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getExploreJobs(msg, callback) {
  let err = {};
  let response = {};

  console.log('In get job topic. Msg: ', msg);
  console.log(msg.state);
  await Jobs.find({ state: msg.state }, (error, result) => {
    if (error) {
      err.message = error;
      err.status = 500;
      return callback(null, error);
    } else if (result) {
      response.status = 200;
      response.message = 'EXPLORE_JOBS';
      response.data = result;
      return callback(null, response);
    }
  });
}

async function applyToJob(msg, callback) {
  let err = {};
  let response = {};
  let studentFName,
    studentLName = '';
  console.log('In post APPLY TO JOB topic service. Msg: ', msg);
  let sql = `Call getStudentHome_data('${msg.body.sql_student_id}');`;

  try {
    pool.query(sql, async (err, result) => {
      if (err) {
        error.message = err;
        error.status = 500;
        return callback(null, error);
      } else {
        studentFName = result[0][0].first_name;
        studentLName = result[0][0].last_name;
        await Jobs.findByIdAndUpdate(
          { _id: msg.body.job_id },
          {
            $addToSet: {
              applied_students: {
                resume_file_name: msg.body.resume_file_name,
                cover_file_name: msg.coverletter,
                sql_student_id: msg.body.sql_student_id,
                application_status: msg.body.application_status,
                student_first_name: studentFName,
                student_last_name: studentLName,
              },
            },
          }
        )
          .then((applyJob) => {
            console.log('Applied to job');
            response.status = 200;
            response.message = 'APPLIED';
            return callback(null, response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = 'Error in Data';
    return callback(err, null);
  }
}

//company job demographics topic
async function getDemographics(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get job demographics topic service. Msg: ', msg);
  console.log(msg.body);

  let sql = `CALL get_applicantDemographics('${msg.body}');`;
  console.log(sql);
  pool.query(sql, (err, result) => {
    if (err) {
      err.status = 400;
      return callback(null, err);
    }
    if (result && result.length > 0 && result[0][0]) {
      console.log(result);
      response.status = 200;
      response.message = 'APPLICANTDETAILS_FETCHED';
      response.data = JSON.stringify(result);
      return callback(null, response);
    }
  });
}

//Admin demographics topic
async function getAdminJobStatistics(msg, callback) {
  let err = {};
  let response = {};
  let count = {};
  let start = new Date();
  start.setDate(start.getDate() - 365);
  start = start.toLocaleDateString();
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  console.log(start);

  await Jobs.aggregate([
    { $match: { companyName: msg.body } },
    { $unwind: '$applied_students' },
    { $unwind: { path: '$applied_students.application_status' } },

    {
      $group: {
        _id: '$applied_students.application_status',
        Frequency: { $sum: 1 },
      },
    },
  ]).then((data) => {
    console.log(data);
    count.selectedCount = data;
  });

  await Jobs.find(
    { companyName: msg.body },
    { 'applied_students.sql_student_id': 1, _id: 0 }
  )
    .then((data) => {
      let applicantId = [];
      for (const key of Object.keys(data[0]._doc)) {
        applicantId = data[0]._doc[key].map((val) => val.sql_student_id);
      }
      console.log(applicantId);
      count.applicantId = applicantId;
    })
    .then(() => {
      console.log(count);
      response.status = 200;
      response.data = count;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getJobs(msg, callback) {
  let err = {};
  let response = {};

  redisClient.get('allJobs', function (err, data) {
    if (err) {
      console.log('error');
      response.status = 400;
    } else if (data) {
      console.log('fetching from redis cache');
      console.log(data);
      response.status = 200;
      response.data = JSON.parse(data);
      // console.log(response);
      return callback(null, response);
    } else {
      console.log("fetching from mongoDb")
      let sql = `Call get_allCompanyProfilePicture();`;
      pool.query(sql, async (err, result) => {
        if (err) {
          err.status = 400;
          return callback(null, err);
        }
        if (result && result.length > 0 && result[0][0]) {
          var companies = result[0];
          await Jobs.find()
            .then((data) => {
              response.status = 200;
              let photoImg = [];
              for (let i = 0; i < data.length; i++) {
                let idx = companies.findIndex((company) => {
                  return company.id === parseInt(data[i].sql_company_id);
                });
                if (idx !== -1) {
                  data[i]['cphoto_file_name'] = companies[idx].cphoto_file_name;
                  photoImg.push(companies[idx].cphoto_file_name);
                }
              }
              let out = {
                data,
                img: photoImg,
              };
              redisClient.setex('allJobs', 36000, JSON.stringify(out));
              response.data = out;
              return callback(null, response);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  });
}

async function searchJobHome(msg, callback) {
  let err = {};
  let response = {};

  let sql = `Call get_allCompanyProfilePicture();`;
  pool.query(sql, async (err, result) => {
    console.log(result);
    if (err) {
      err.status = 400;
      return callback(null, err);
    }
    if (result && result.length > 0 && result[0][0]) {
      var companies = result[0];
      await Jobs.find({
        $or: [
          { title: new RegExp(msg.body.search_param, 'gi') },
          { companyName: new RegExp(msg.body.search_param, 'gi') },
        ],
      })
        .then((data) => {
          if (data.length > 0) {
            let photoImg = [];
            for (let i = 0; i < data.length; i++) {
              console.log('data');
              let idx = companies.findIndex((company) => {
                return company.id === parseInt(data[i].sql_company_id);
              });
              console.log('data[i].sql_company_id = ', data[i].sql_company_id);
              console.log(idx);
              if (idx !== -1) {
                data[i]['cphoto_file_name'] = companies[idx].cphoto_file_name;
                photoImg.push(companies[idx].cphoto_file_name);
              }
              console.log(
                'data[i].cphoto_file_name = ',
                data[i].cphoto_file_name
              );
            }
            let out = {
              data,
              img: photoImg,
            };
            response.data = out;
            console.log('response.data value ');
            console.log(photoImg);
            response.status = 200;
            return callback(null, response);
          } else {
            response.status = 200;
            response.data = 'NO_RECORD';
            return callback(null, response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

async function getStudentAppliedJobs(msg, callback) {
  let err = {};
  let response = {};

  console.log('In getStudentAppliedJobs. Msg: ', msg);

  await Jobs.find({ 'applied_students.sql_student_id': msg.body.student_id })
    .then((data) => {
      if (data.length > 0) {
        response.status = 200;
        // response.data = data;
        response.data = data;
        return callback(null, response);
      } else {
        response.status = 500;
        // response.data = data;
        response.message = 'NO_RECORD';
        return callback(null, response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateApplicantStatus(msg, callback) {
  let err = {};
  let response = {};
  console.log('In updateApplicantStatus topic. Msg: ', msg);
  console.log(msg.body.status);
  await Jobs.findOneAndUpdate(
    { 'applied_students._id': msg.body._id },
    {
      $set: {
        'applied_students.$.application_status': msg.body.status,
      },
    },
    { safe: true, new: true, useFindAndModify: false }
  )
    .then((data) => {
      response.status = 200;
      response.message = 'Updated';
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}
