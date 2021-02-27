'use strict';
const sqlDB = require('../config/sqlConfig');
const Company = require('../models/company');

exports.companyPhotoServices = function (msg, callback) {
  console.log('In studentResumeServices \n', msg.path);
  switch (msg.path) {
    case 'uploadCompanyPhoto':
      uploadCompanyPhoto(msg, callback);
      break;
    case 'getCompanyPhotos':
      getCompanyPhotos(msg, callback);
      break;
    case 'getStudentPhotos':
      getStudentPhotos(msg, callback);
      break;
    case 'incrementVisits':
      incrementVisits(msg, callback);
      break;
    case 'topVisits':
      topVisits(msg, callback);
      break;
    case 'getAllPhotos':
      getAllPhotos(msg, callback);
      break;
    case 'approvePhotos':
      approvePhotos(msg, callback);
      break;
  }
};

async function uploadCompanyPhoto(msg, callback) {
  let error = {},
    response = {};
  console.log('IN COMPANY PHOTOS TOPIC', msg);
  Company.findOneAndUpdate(
    { sql_company_id: msg.companyId },
    {
      $push: { photos: { $each: msg.data } },
    },
    (error1, result1) => {
      if (error1) {
        error.message = error1;
        error.status = 500;
        return callback(null, error);
      } else if (result1) {
        response.status = 200;
        response.message = 'PHOTO_UPLOADED';
        response.data = 'CHANGES_SAVED';
        return callback(null, response);
      } else if (!error1 && !result1) {
        Company.create(
          {
            sql_company_id: msg.companyId,
            photos: msg.data,
          },
          (error2, result2) => {
            if (error2) {
              error.message = error2;
              error.status = 500;
              return callback(null, error);
            } else if (result2) {
              console.log(result2);
              response.status = 200;
              response.message = 'PHOTO_UPLOADED';
              response.data = 'CHANGES_SAVED';
              return callback(null, response);
            }
          },
        );
      }
    },
  );
}

async function getCompanyPhotos(msg, callback) {
  let error = {},
    response = {};
  console.log('IN COMPANY PHOTOS TOPIC', msg);
  Company.find(
    { sql_company_id: msg.companyId },
    { photos: 1 },
    (err, result) => {
      if (err) {
        error.message = err;
        error.status = 500;
        return callback(null, error);
      } else if (result.length > 0) {
        console.log(result[0].photos);
        let final_Arr = [];
        for (const key of Object.keys(result[0].photos)) {
          if (result[0].photos[key].review_status === 'Approved') {
            final_Arr = final_Arr.concat(result[0].photos[key]);
          }
        }
        response.status = 200;
        response.message = 'PHOTO_UPLOADED';
        response.data = final_Arr;
        return callback(null, response);
      } else {
        response.status = 200;
        response.message = 'PHOTO_UPLOADED';
        response.data = 'NO_PHOTOS_AVAILABLE';
        return callback(null, response);
      }
    },
  );
}

async function getStudentPhotos(msg, callback) {
  let error = {},
    response = {};
  const id = msg.studentId;
  console.log('IN COMPANY PHOTOS TOPIC', msg);
  Company.find({ 'photos.sql_student_id': msg.studentId }, (err, result) => {
    if (err) {
      error.message = err;
      error.status = 500;
      return callback(null, error);
    } else if (result) {
      console.log(typeof result);
      let tempArr = [],
        tempObj = {};
      var output = [];
      result.forEach((res) => {
        tempObj = {};
        tempObj.photos = res.photos;
        tempArr.push(tempObj);
      });
      tempArr.forEach((item) => {
        output.push(item.photos);
      });
      tempArr.forEach((item) => {
        output.push(item.photos);
      });
      let photos_arr_obj = [];
      for (const key of Object.keys(output)) {
        photos_arr_obj = photos_arr_obj.concat(output[key]);
      }
      console.log(photos_arr_obj);
      response.status = 200;
      response.message = 'PHOTO_UPLOADED';
      response.data = photos_arr_obj;
      return callback(null, response);
    }
    console.log(photos_arr_obj);
    let final_Arr = [];
    for (const key of Object.keys(photos_arr_obj)) {
      if (photos_arr_obj[key].sql_student_id === parseInt(msg.studentId)) {
        final_Arr = final_Arr.concat(photos_arr_obj[key]);
      }
    }
    response.status = 200;
    response.message = 'PHOTO_UPLOADED';
    response.data = final_Arr;
    return callback(null, response);
  });
}

async function incrementVisits(msg, callback) {
  console.log('IN COMPANY PHOTOS TOPIC for increment views', msg);
  Company.findOneAndUpdate(
    { sql_company_id: msg.companyID },
    { $inc: { noOfViews: 1 } },
    (err, result) => {
      if (err) {
        console.log('error in increment:', err);
        error.message = err;
        error.status = 500;
        return callback(null, error);
      } else if (result) {
        console.log(typeof result);
        console.log('result in increment API:', result);
        return callback(null, result);
      }
      Company.create(
        {
          sql_company_id: msg.companyID,
          noOfViews: 1,
        },
        (error2, result2) => {
          if (error2) {
            return callback(null, error2);
          } else if (result2) {
            console.log(result2);
            return callback(null, result2);
          }
        },
      );
    },
  );
}

async function topVisits(msg, callback) {
  let error = {},
    response = {};
  console.log('IN COMPANY PHOTOS TOPIC for increment views', msg);
  Company.find()
    .sort({ noOfViews: -1 })
    .limit(10)
    .then(function (result) {
      if (result) {
        console.log(typeof result);

        console.log('result in increment API:', result);

        let output = {};
        for (var each of result) {
          output[each.sql_company_id] = each.noOfViews;
        }
        console.log('kafka backend for top visits:', output);
        return callback(null, output);
      } else {
        return callback(null, { msg: 'error' });
      }
    });
}

async function getAllPhotos(msg, callback) {
  let error = {},
    response = {};
  console.log('IN COMPANY PHOTOS TOPIC', msg);
  Company.find({}, { _id: 0, photos: 1 }, (err, result) => {
    if (err) {
      error.message = err;
      error.status = 500;
      return callback(null, error);
    } else if (result) {
      console.log(typeof result);
      let tempArr = [],
        tempObj = {};
      var output = [];
      result.forEach((res) => {
        tempObj = {};
        tempObj.photos = res.photos;
        tempArr.push(tempObj);
      });
      tempArr.forEach((item) => {
        output.push(item.photos);
      });
      tempArr.forEach((item) => {
        output.push(item.photos);
      });
      let photos_arr_obj = [];
      for (const key of Object.keys(output)) {
        photos_arr_obj = photos_arr_obj.concat(output[key]);
      }
      response.status = 200;
      response.message = 'PHOTO_UPLOADED';
      response.data = photos_arr_obj;
      return callback(null, response);
    }
  });
}

async function approvePhotos(msg, callback) {
  let err = {};
  let response = {};
  console.log('In update photo approved service. Msg: ', msg);
  await Company.findOneAndUpdate(
    { 'photos._id': msg.id },
    {
      $set: {
        'photos.$.review_status': msg.body,
      },
    },
    { safe: true, new: true, useFindAndModify: false },
  )
    .then((user) => {
      console.log(user);
      response.status = 200;
      response.message = 'PHOTO_UPDATED';
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}
