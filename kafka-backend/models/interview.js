const mongoose = require('mongoose');
const schema = mongoose.Schema;

var interviewSchema = new schema(
  {
    sql_company_id: { type: String, required: true },
    sql_student_id: { type: String, required: true },
    companyName: { type: String, required: true },
    overall_experience: { type: String, required: true },
    job_title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: Number, required: true },
    offer_status: { type: String, required: true },
    interview_date: { type: Date, required: true },
    interview_q_a: [
      {
        question: { type: String, required: true },
        answers: [
          { answer: { type: String }, sql_student_id: { type: String } },
        ],
      },
    ],
  },
  {
    versionKey: false,
  }
);

var Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
