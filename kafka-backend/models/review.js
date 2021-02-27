const mongoose = require("mongoose");
const schema = mongoose.Schema;

var reviewSchema = new schema(
  {
    sql_company_id: { type: mongoose.Schema.Types.String, required: true },
    rating: {
    type: mongoose.Schema.Types.Number,
    min: 1,
    max: 5,
    required: true,
  },
  sql_student_id:{type: mongoose.Schema.Types.String, required: true},
  headline: { type: mongoose.Schema.Types.String, required: true, },
  description: { type: mongoose.Schema.Types.String, required: true, },
  pros: { type: mongoose.Schema.Types.String, required: true,},
  cons: { type: mongoose.Schema.Types.String,required: true, },
  helpful:{type: mongoose.Schema.Types.Number, default:0 },
  ceo_rating:{ type: mongoose.Schema.Types.Number}, 
  recommended:{ type: mongoose.Schema.Types.Number},
  company:{type: mongoose.Schema.Types.String, required: true},
  reply: {type: mongoose.Schema.Types.String},
  job_title:{type: mongoose.Schema.Types.String, required: true},
  date: { type: mongoose.Schema.Types.Date, default: Date.now() },
featured:{ type: mongoose.Schema.Types.Boolean, default: false},
favorite:{ type: mongoose.Schema.Types.Boolean, default: false}, 
status:{ type: mongoose.Schema.Types.Boolean, default: true},  
approvedstatus:{type: mongoose.Schema.Types.String, default: "Pending"},
},

  {
    versionKey: false,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;



