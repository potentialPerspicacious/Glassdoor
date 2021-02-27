'use strict';
const express = require('express');
const app = express.Router();
const student = require('../../controllers/student.controller.js');
var { checkAuth } = require('../../config/passport');
var kafka = require('../../kafka/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadToS3 = require('../../utils/awsS3bucketUpload');
const { constants } = require('buffer');

const storage = multer.diskStorage({
  destination:
    path.join(__dirname, '../..') + '/public/uploads/student/resumes',
  filename: (req, file, cb) => {
    cb(
      null,
      'student' +
        req.params.id +
        '-' +
        'resume' +
        '-' +
        Date.now() +
        'nameSplitter' +
        file.originalname,
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single('file');

const image_storage = multer.diskStorage({
  destination:
    path.join(__dirname, '../..') + '/public/uploads/student/profile_pictures',
  filename: (req, file, cb) => {
    cb(
      null,
      'student' +
        req.params.id +
        '-' +
        'resume' +
        '-' +
        Date.now() +
        'nameSplitter' +
        file.originalname,
    );
  },
});

const upload_image = multer({
  storage: image_storage,
  limits: { fileSize: 1000000 },
}).single('file');

const company_image_storage = multer.diskStorage({
  destination: path.join(__dirname, '../..') + '/public/uploads/s3Temp',
  filename: (req, file, cb) => {
    cb(
      null,
      'company' +
        req.params.id +
        '-' +
        'photo' +
        '-' +
        Date.now() +
        'nameSplitter' +
        file.originalname,
    );
  },
});

const upload_company_image = multer({
  storage: company_image_storage,
  limits: { fileSize: 1000000 },
}).array('company_images', 20);

app.post('/register', student.create);
app.post('/login', student.validate);

app.get('/home/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'getStudentHomedata', userId: req.params.id },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student home data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.get('/profile/:id', (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'getStudentProfiledata', userId: req.params.id },
    function (err, results) {
      console.log(results);
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.post('/basicProfile/:id', checkAuth, (req, res) => {
  console.log(req.body);
  kafka.make_request(
    'studentProfile_topic',
    { path: 'editStudentBasicProfile', userId: req.params.id, data: req.body },
    function (err, results) {
      console.log(results);
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.post('/aboutMe/:id', checkAuth, (req, res) => {
  console.log(req.body);
  kafka.make_request(
    'studentProfile_topic',
    { path: 'editStudentAboutMe', userId: req.params.id, data: req.body },
    function (err, results) {
      console.log(results);
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.post('/addExperience/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'addStudentExperience', userId: req.params.id, data: req.body },
    function (err, results) {
      console.log(results);
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.post('/addSkills/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'addStudentSkills', userId: req.params.id, data: req.body },
    function (err, results) {
      console.log(results);
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.post('/addEducation/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'addStudentEducation', userId: req.params.id, data: req.body },
    function (err, results) {
      console.log(results);
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.post('/addResume/:id', checkAuth, (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      const resume_data = {
        resume: req.file.filename,
        is_primary: req.body.is_primary,
      };
      kafka.make_request(
        'studentResume_topic',
        { path: 'addStudentResume', userId: req.params.id, data: resume_data },
        function (err, results) {
          console.log('In make request call back', results);
          if (err) {
            console.log('Inside err');
            return res.status(err.status).send(err.message);
          } else {
            console.log('Inside Student resume data');
            return res.status(results.status).send(results.data);
          }
        },
      );
    }
  });
});

app.post('/markPrimaryResume/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentResume_topic',
    { path: 'markPrimaryResume', userId: req.params.id, data: req.body },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.post('/deleteResume/:id', checkAuth, (req, res) => {
  var resume_path =
    path.join(__dirname, '../..') +
    '/public/uploads/student/resumes/' +
    req.body.resume;
  fs.unlink(resume_path, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      kafka.make_request(
        'studentResume_topic',
        { path: 'deleteResume', userId: req.params.id, data: req.body },
        function (err, results) {
          console.log('In make request call back', results);
          if (err) {
            console.log('Inside err');
            return res.status(err.status).send(err.message);
          } else {
            console.log('Inside Student profile data');
            return res.status(results.status).send(results.data);
          }
        },
      );
    }
  });
});

app.post('/openResume', (req, res) => {
  var file_path =
    path.join(__dirname, '../..') +
    '/public/uploads/student/resumes/' +
    req.body.resume;
  if (fs.existsSync(file_path)) {
    res.sendFile(file_path);
  } else {
    res.send('FILE DOES NOT EXISTS');
  }
});

app.post('/addJobPreferences/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'addJobPreferences', userId: req.params.id, data: req.body },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.post('/addCompanyPreferences/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'addCompanyPreferences', userId: req.params.id, data: req.body },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.post('/addDemographics/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'addDemographics', userId: req.params.id, data: req.body },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.get('/getStudentDemographics/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'getStudentDemographics', userId: req.params.id },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.get('/deleteDemographics/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'deleteDemographics', userId: req.params.id },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        return res.status(results.status).send(results.data);
      }
    },
  );
});

app.get('/studentInterviews/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'interview_topic',
    { path: 'getStudentReviews', userId: req.params.id },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(500).send(err);
      } else {
        console.log('Inside Student profile data');
        return res.status(200).send(results);
      }
    },
  );
});
app.get('/studentSalaries/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'salary_topic',
    { path: 'getStudentSalaries', userId: req.params.id },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(500).send(err);
      } else {
        console.log('Inside Student profile data');
        return res.status(200).send(results);
      }
    },
  );
});

app.get('/studentReviews/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'review_topic',
    { path: 'getStudentReviews', userId: req.params.id },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(500).send(err);
      } else {
        console.log('Inside Student profile data');
        return res.status(200).send(results);
      }
    },
  );
});

app.get('/exploreJobs/:state', checkAuth, (req, res) => {
  console.log('OK');
  kafka.make_request(
    'jobs_topic',
    { path: 'getExploreJobs', state: req.params.state },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(500).send(err);
      } else {
        console.log('Inside Jobs explore data');
        return res.status(200).send(results.data);
      }
    },
  );
});

app.post('/addProfilePicture/:id', checkAuth, (req, res) => {
  upload_image(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      const profile_picture = {
        file_name: req.file.filename,
      };
      kafka.make_request(
        'studentProfile_topic',
        {
          path: 'addStudentProfilePicture',
          userId: req.params.id,
          data: profile_picture,
        },
        function (err, results) {
          console.log('In make request call back', results);
          if (err) {
            console.log('Inside err');
            return res.status(err.status).send(err.message);
          } else {
            console.log('Inside Student resume data');
            return res.status(results.status).send(results.data);
          }
        },
      );
    }
  });
});

app.get('/getProfilePicture/:id', (req, res) => {
  kafka.make_request(
    'studentProfile_topic',
    { path: 'getStudentProfilePicture', userId: req.params.id },
    function (err, results) {
      console.log('In make profile picture request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(err.status).send(err.message);
      } else {
        console.log('Inside Student profile data');
        var image =
          path.join(__dirname, '../..') +
          '/public/uploads/student/profile_pictures/' +
          results[0].profile_picture;
        if (fs.existsSync(image)) {
          res.sendFile(image);
        } else {
          return res.sendFile(
            path.join(__dirname, '../..') +
              '/public/uploads/student/profile_pictures/studentPlaceholder.png',
          );
        }
      }
    },
  );
});

app.post('/addCompanyPictures/:id', checkAuth, (req, res) => {
  var promises = [];
  upload_company_image(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      for (var i = 0; i < req.files.length; i++) {
        var file = req.files[i];
        promises.push(
          uploadToS3(file, 'companyPhotos', req.body.sql_company_id),
        );
      }
      Promise.all(promises)
        .then(function (data) {
          let s3Arr = [],
            s3Obj = {};
          data.forEach((url) => {
            s3Obj = {};
            (s3Obj.sql_student_id = req.body.sql_student_id),
              (s3Obj.company_name = req.body.company_name),
              (s3Obj.s3Url = url);
            s3Arr.push(s3Obj);
          });
          kafka.make_request(
            'photos_topic',
            {
              path: 'uploadCompanyPhoto',
              company_name: req.body.company_name,
              companyId: req.body.sql_company_id,
              data: s3Arr,
            },
            function (err, results) {
              console.log('In make request call back', results);
              if (err) {
                console.log('Inside err');
                return res.status(500).send(err);
              } else {
                console.log('Inside Jobs explore data');
                return res.status(200).send(results.data);
              }
            },
          );
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });
});

app.get('/getCompanyPhotos/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'photos_topic',
    { path: 'getCompanyPhotos', companyId: req.params.id },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(500).send(err);
      } else {
        console.log('Inside Jobs explore data');
        return res.status(200).send(results.data);
      }
    },
  );
});

app.get('/getStudentPhotos/:id', checkAuth, (req, res) => {
  kafka.make_request(
    'photos_topic',
    { path: 'getStudentPhotos', studentId: req.params.id },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(500).send(err);
      } else {
        console.log('Inside Jobs explore data');
        return res.status(200).send(results.data);
      }
    },
  );
});

app.post('/incrementVisits/:id', (req, res) => {
  kafka.make_request(
    'photos_topic',
    { path: 'incrementVisits', companyID: req.params.id },
    function (err, results) {
      console.log('In make request call back', results);
      if (err) {
        console.log('Inside err');
        return res.status(500).send(err);
      } else {
        console.log('Inside Jobs explore data');
        return res.status(200).send(results);
      }
    },
  );
});

module.exports = app;
