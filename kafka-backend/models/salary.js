const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
    sql_company_id: {type: mongoose.Schema.Types.String, required: true },
    sql_student_id:{type: mongoose.Schema.Types.String, required: true},
    base_salary:{type: mongoose.Schema.Types.Number, default:0 },
    currancy:{type: mongoose.Schema.Types.String, required: true},
    bonus:{type: mongoose.Schema.Types.Number},
    job_title:{type: mongoose.Schema.Types.String, required: true},
    year_of_experience:{type: mongoose.Schema.Types.Number,required: true},
    location:{type: mongoose.Schema.Types.String, required: true},
    company:{type: mongoose.Schema.Types.String, required: true}
},
{
  timestamps: true,
});

module.exports = Review = mongoose.model('salary', SalarySchema);
