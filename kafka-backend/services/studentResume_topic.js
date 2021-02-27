"use strict";
const sqlDB = require('../config/sqlConfig')
const studentModel = require('../models/student')

exports.studentResumeServices = function (msg, callback) {
  console.log("In studentResumeServices \n", msg.path);
  switch (msg.path) {
    case "addStudentResume":
      addStudentResume(msg, callback);
      break;
    case "markPrimaryResume":
      markPrimaryResume(msg, callback);
      break;
    case "deleteResume":
      deleteResume(msg, callback);
      break;
  }
};

async function addStudentResume(msg, callback){
    let error = {}, response = {}
    console.log("IN STUDENT RESUME TOPIC", msg)
    if(msg.data.is_primary === 'true'){
        studentModel.update({ sql_student_id: msg.userId, resumes: {$exists: true} },
        { "$set": { "resumes.$[elem].is_primary": false } },
        { "arrayFilters": [{ "elem.is_primary": true }], "multi": true }, (error1, result1) => {
        if(error1){
        console.log(error1)
        error.message = error1
        error.status = 500
        return callback(null, error);
        } else if (result1) {
        studentModel.findOneAndUpdate({sql_student_id: msg.userId},
        {$push : {'resumes': {
        resume: msg.data.resume,
        is_primary: msg.data.is_primary
        }}}, (error2, result2) => {
        if(error2) {
        error.message = error2
        error.status = 500
        return callback(null, error)
        } else if(result2) {
        response.status = 200
        response.message = 'RESUME_ADDED'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
        } else if(!error2 && !result2){
        studentModel.create({
        sql_student_id: msg.userId,
        resumes: [msg.data]}, (error3, result3) => {
        if (error3) {
        error.message = error3
        error.status = 500
        return callback(null, error);
        } else if(result3){
        response.status = 200
        response.message = 'RESUME_ADDED'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
        }
      })      
    }
  })
}
    })
    } else {
    studentModel.findOneAndUpdate({sql_student_id: msg.userId},
      {$push : {'resumes': {
        resume: msg.data.resume,
        is_primary: msg.data.is_primary
      }}}, (error1, result1) => {
        if(error1){
          error.message = error1
          error.status = 500
          return callback(null, error);
        } else if (result1){
          response.status = 200
          response.message = 'RESUME_ADDED'
          response.data = "CHANGES_SAVED"
          return callback(null, response)
        } else if(!error1 && !result1){
          studentModel.create({
            sql_student_id: msg.userId,
            resumes: [msg.data]}, (error2, result2) => {
            if (error2) {
              error.message = error2
              error.status = 500
              return callback(null, error);
            } else if(result2){
              response.status = 200
              response.message = 'RESUME_ADDED'
              response.data = "CHANGES_SAVED"
              return callback(null, response)
            }
          })
        }
      })
    }
  }

  async function markPrimaryResume (msg, callback) {
    let error = {}, response = {}
    console.log("IN STUDENT RESUME TOPIC", msg)
    studentModel.update({sql_student_id: msg.userId}, 
      { "$set": { "resumes.$[elem].is_primary": false } },
      { "arrayFilters": [{ "elem.is_primary": true }], "multi": true }, (error1, result1) => {
        if(error1) {
          error.message = error1
          error.status = 500
          return callback(null, error);
        } else if (result1) {
          studentModel.update({sql_student_id: msg.userId},
            { "$set": { "resumes.$[elem].is_primary": true } },
            { "arrayFilters": [{ "elem._id": msg.data._id }], "multi": true }, (error2, result2) => {
              if(error2) {
                error.message = error2
                error.status = 500
                return callback(null, error);
              } else if (result2) {
                response.status = 200
                response.message = 'RESUME_UPDATED'
                response.data = "CHANGES_SAVED"
                return callback(null, response)
              }
            })
        }
      })
  }
  
  async function deleteResume (msg, callback) {
    let error = {}, response = {}
    console.log("IN STUDENT RESUME TOPIC", msg)
    studentModel.update({sql_student_id: msg.userId},
      {$pull :{"resumes" : {_id : msg.data._id}}}, (err, result) => {
        if(err) {
          error.message = err
          error.status = 500
          return callback(null, error);
        } else if (result) {
          response.status = 200
          response.message = 'RESUME_UPDATED'
          response.data = "CHANGES_SAVED"
          return callback(null, response)
        }
      })
  }