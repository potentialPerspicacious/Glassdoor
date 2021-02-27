const express = require('express');
const app = express.Router();
const admin = require('../../controllers/admin.controller.js');
// var { checkAuth } = require('../../config/passport');

app.get('/reviewcount', admin.reviewsPerDay);
app.get('/mostreviewed', admin.mostReviewed);
app.get('/toprated', admin.topRated);
app.get('/topstudents', admin.topStudents);
app.get('/topceo', admin.topCeo);
app.get('/topvisits', admin.topVisits);

module.exports = app;
