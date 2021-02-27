const express = require('express');
const app = express.Router();
const company = require('../../controllers/company.controller.js');
var { checkAuth } = require('../../config/passport');

app.post('/register', company.create);
app.post('/search/company', checkAuth, company.search);
app.post('/search/interview', checkAuth, company.searchInterview);
app.post('/search/salary', checkAuth, company.searchSalary);
// app.post('/login', user.validate)

module.exports = app;
