"use strict";
const sqlDB = require('../config/sqlConfig')
const studentModel = require('../models/student')

exports.studentProfileServices = function (msg, callback) {
  console.log("In studentProfileServices \n", msg.path);
  switch (msg.path) {
    case "getStudentHomedata":
        getStudentHomedata(msg, callback);
      break;

    case "getStudentProfiledata":
      getStudentProfiledata(msg, callback);
      break;

    case "editStudentBasicProfile":
      editStudentBasicProfile(msg, callback);
      break;

    case "editStudentAboutMe":
      editStudentAboutMe(msg, callback);
      break;

    case "addStudentExperience":
      addStudentExperience(msg, callback);
      break;
    
    case "addStudentSkills":
      addStudentSkills(msg, callback);
      break;

    case "addStudentEducation":
      addStudentEducation(msg, callback);
      break;

    case "addJobPreferences":
      addJobPreferences(msg, callback);
      break;

    case "addCompanyPreferences":
      addCompanyPreferences(msg, callback);
      break;
    
    case "addDemographics":
      addDemographics(msg, callback);
      break;

    case "getStudentDemographics":
      getStudentDemographics(msg, callback);
      break;

    case "deleteDemographics":
      deleteDemographics(msg, callback);
      break;

    case "addStudentProfilePicture":
      addStudentProfilePicture(msg,callback);
      break;

    case "getStudentProfilePicture":
      getStudentProfilePicture(msg, callback);
      break;
  }
};

async function getStudentHomedata(msg, callback){
    let error = {}, response = {}
    console.log("IN STUDENT PROFILE TOPIC", msg)
    let sql = `Call getStudentHome_data('${(msg.userId)}');`
    await sqlDB.query(sql, (err, result) => {
        if (err) {
          error.message = err
          error.status = 500
          return callback(null, error);
        } else{
          response.status = 200
          response.message = 'FETCH_STUDENT_LANDINGPAGE'
          response.data = result[0]
          return callback(null, response)
        }
      });
}

async function getStudentProfiledata(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  let sql = `Call getStudentProfile_data('${(msg.userId)}');`
  await sqlDB.query(sql, (err, result) => {
      if (err) {
        error.message = err
        error.status = 500
        return callback(null, error);
      } else{
        let sql_result = result
        studentModel.findOne({sql_student_id: msg.userId}, (error1, result1) => {
          if(!error1 && !result1){
            console.log("AREE YOU HEERE??")
            response.status = 200
            response.message = 'EDIT_STUDENT_PROFILE'
            response.data = sql_result[0]
            return callback(null, response)
          } else if (error1){
            error.message = error1
            error.status = 500
            return callback(null, error);
          } else if(result1){
            response.status = 200
            response.message = 'EDIT_STUDENT_PROFILE'
            response.data = [Object.assign(sql_result[0][0], result1._doc)]
            return callback(null, response)
          }
        })
      }
    });
}

async function editStudentBasicProfile(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  let sql = `Call editStudentProfile_data('${(msg.userId)}', '${(msg.data.first_name)}', '${(msg.data.last_name)}',
  '${(msg.data.job_title)}', '${(msg.data.city)}', '${(msg.data.address)}', '${(msg.data.email)}', '${(msg.data.state)}', '${(msg.data.zip)}',
  '${(msg.data.phone_number)}', '${(msg.data.website)}');`
  await sqlDB.query(sql, (err, result) => {
      if (err) {
        error.message = err
        error.status = 500
        return callback(null, error);
      } else {
        response.status = 200
        response.message = 'EDIT_STUDENT_PROFILE'
        response.data = result[0]
        return callback(null, response)
      }
    });
}

async function editStudentAboutMe(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  await studentModel.findOneAndUpdate({sql_student_id: msg.userId}, {aboutMe: msg.data.description}, (error1, result1) => {
    if(error1){
      error.message = error1
      error.status = 500
      return callback(null, error);
    } else if (result1){
      response.status = 200
      response.message = 'ABOUT_ME'
      response.data = "CHANGES_SAVED"
      return callback(null, response)
    } else if( !error1 && !result1){
      studentModel.create({
        sql_student_id: msg.userId,
        aboutMe: msg.data.description
      }, (error2, result2) => {
        if (error2) {
          error.message = error2
          error.status = 500
          return callback(null, error);
        } else{
          response.status = 200
          response.message = 'ABOUT_ME'
          response.data = "CHANGES_SAVED"
          return callback(null, response)
        }
      })
    } 
  })

}

async function addStudentExperience(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  studentModel.findOneAndUpdate({sql_student_id: msg.userId},
    {$push : {'experience': {
      title: msg.data.title,
      company_name: msg.data.company_name,
      location: msg.data.location,
      start_month: msg.data.start_month,
      start_year: msg.data.start_year,
      end_month: msg.data.end_month,
      end_year: msg.data.end_year,
      description: msg.data.description
    }}}, (error1, result1) => {
      if(error1){
        error.message = error1
        error.status = 500
        return callback(null, error);
      } else if (result1){
        response.status = 200
        response.message = 'ABOUT_ME'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
      } else if(!error1 && !result1){
        studentModel.create({
          sql_student_id: msg.userId,
          experience: [msg.data]}, (error2, result2) => {
          if (error2) {
            error.message = error2
            error.status = 500
            return callback(null, error);
          } else if(result2){
            response.status = 200
            response.message = 'ABOUT_ME'
            response.data = "CHANGES_SAVED"
            return callback(null, response)
          }
        })
      }
    })

}

async function addStudentSkills (msg, callback) {
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  await studentModel.findOneAndUpdate({sql_student_id: msg.userId}, 
    {skills: msg.data}, (error1, result1) => {
      if (error1) {
        error.message = error1
        error.status = 500
        return callback(null, error);
      } else if(result1) {
        response.status = 200
        response.message = 'ABOUT_ME'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
      } else if (!error1 && !result1){
        studentModel.create({sql_student_id: msg.userId, 
        skills: msg.data}, (error2, result2) => {
          if (error2) {
            error.message = error2
            error.status = 500
            return callback(null, error);
          } else {
            response.status = 200
            response.message = 'ABOUT_ME'
            response.data = "CHANGES_SAVED"
            return callback(null, response)
          }
        })
      }
    })
}

async function addStudentEducation(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  studentModel.findOneAndUpdate({sql_student_id: msg.userId},
    {$push : {'education': {
      institution_name: msg.data.institution_name,
      degree_certificate: msg.data.degree_certificate,
      field_of_study: msg.data.field_of_study,
      location: msg.data.location,
      start_month: msg.data.start_month,
      start_year: msg.data.start_year,
      end_month: msg.data.end_month,
      end_year: msg.data.end_year,
      description: msg.data.description
    }}}, (error1, result1) => {
      if(error1){
        error.message = error1
        error.status = 500
        return callback(null, error);
      } else if (result1){
        response.status = 200
        response.message = 'ABOUT_ME'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
      } else if(!error1 && !result1){
        studentModel.create({
          sql_student_id: msg.userId,
          education: [msg.data]}, (error2, result2) => {
          if (error2) {
            error.message = error2
            error.status = 500
            return callback(null, error);
          } else if(result2){
            response.status = 200
            response.message = 'ABOUT_ME'
            response.data = "CHANGES_SAVED"
            return callback(null, response)
          }
        })
      }
    })

}

async function addJobPreferences (msg, callback) {
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  await studentModel.findOneAndUpdate({sql_student_id: msg.userId}, 
    {job_preferences: msg.data}, (error1, result1) => {
      if (error1) {
        error.message = error1
        error.status = 500
        return callback(null, error);
      } else if(result1) {
        response.status = 200
        response.message = 'ABOUT_ME'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
      } else if (!error1 && !result1){
        studentModel.create({sql_student_id: msg.userId, 
        job_preferences: msg.data}, (error2, result2) => {
          if (error2) {
            error.message = error2
            error.status = 500
            return callback(null, error);
          } else {
            response.status = 200
            response.message = 'ABOUT_ME'
            response.data = "CHANGES_SAVED"
            return callback(null, response)
          }
        })
      }
    })
}

async function addCompanyPreferences (msg, callback) {
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  await studentModel.findOneAndUpdate({sql_student_id: msg.userId}, 
    {company_preferences: msg.data}, (error1, result1) => {
      if (error1) {
        error.message = error1
        error.status = 500
        return callback(null, error);
      } else if(result1) {
        response.status = 200
        response.message = 'ABOUT_ME'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
      } else if (!error1 && !result1){
        studentModel.create({sql_student_id: msg.userId, 
          company_preferences: msg.data}, (error2, result2) => {
          if (error2) {
            error.message = error2
            error.status = 500
            return callback(null, error);
          } else {
            response.status = 200
            response.message = 'ABOUT_ME'
            response.data = "CHANGES_SAVED"
            return callback(null, response)
          }
        })
      }
    })
}

async function addDemographics(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  let sql = `Call addStudentProfile_demographics('${(msg.userId)}', '${(msg.data.race_ethnicity)}', '${(msg.data.gender_identity)}',
  '${(msg.data.sexual_orientation)}', '${(msg.data.disabilities)}', '${(msg.data.care_giver)}', '${(msg.data.veteran_status)}');`
  await sqlDB.query(sql, (err, result) => {
      if (err) {
        error.message = err
        error.status = 500
        return callback(null, error);
      } else {
        response.status = 200
        response.message = 'EDIT_STUDENT_PROFILE'
        response.data = result[0]
        return callback(null, response)
      }
    });
}

async function getStudentDemographics(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  let sql = `Call getStudentDemographics_data('${(msg.userId)}');`
  await sqlDB.query(sql, (err, result) => {
      if (err) {
        error.message = err
        error.status = 500
        return callback(null, error);
      } else{
        response.status = 200
        response.message = 'FETCH_STUDENT_DEMOGRAPHICS'
        response.data = result[0]
        return callback(null, response)
      }
    });
}

async function deleteDemographics(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  let sql = `Call deleteDemographics_data('${(msg.userId)}');`
  await sqlDB.query(sql, (err, result) => {
      if (err) {
        error.message = err
        error.status = 500
        return callback(null, error);
      } else{
        response.status = 200
        response.message = 'DELETE_STUDENT_DEMOGRAPHICS'
        response.data = result[0]
        return callback(null, response)
      }
    });
}

async function addStudentProfilePicture (msg, callback) {
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  await studentModel.findOneAndUpdate({sql_student_id: msg.userId}, 
    {profile_picture: msg.data.file_name}, (error1, result1) => {
      if (error1) {
        error.message = error1
        error.status = 500
        return callback(null, error);
      } else if(result1) {
        response.status = 200
        response.message = 'ABOUT_ME'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
      } else if (!error1 && !result1){
        studentModel.create({sql_student_id: msg.userId, 
          profile_picture: msg.data.file_name}, (error2, result2) => {
          if (error2) {
            error.message = error2
            error.status = 500
            return callback(null, error);
          } else {
            response.status = 200
            response.message = 'ABOUT_ME'
            response.data = "CHANGES_SAVED"
            return callback(null, response)
          }
        })
      }
    })
}

async function getStudentProfilePicture(msg, callback) {
  let err = {}, response = {};
  console.log('get Student profile picture: ', msg);
  await studentModel.find({sql_student_id: msg.userId}, (result, error) => {
    if(error){
      err.message = error
      err.status = 500
      return callback(null, error);
    } else if(result){
      response.status = 200
      response.message = 'STUDENT_INTERVIEWS'
      response.data = JSON.stringify(result)
      return callback(null, response)
    }
  })


}
