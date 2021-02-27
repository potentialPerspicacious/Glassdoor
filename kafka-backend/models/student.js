const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var experienceSchema = new Schema(
  {
    title: { type: String, required: true },
    company_name: { type: String, required: true },
    location: { type: String, required: true },
    start_month: { type: String, required: true },
    start_year: { type: String, required: true },
    end_month: { type: String, required: true },
    end_year: { type: String, required: true },
    description: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);

var skillsSchema = new Schema(
  {
    skill: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);

var educationSchema = new Schema(
  {
    institution_name: { type: String, required: true },
    degree_certificate: { type: String, required: true },
    field_of_study: { type: String, required: true },
    location: { type: String, required: true },
    start_month: { type: String, required: true },
    start_year: { type: String, required: true },
    end_month: { type: String, required: true },
    end_year: { type: String, required: true },
    description: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);

var resumeSchema = new Schema(
  {
    resume: { type: String, required: true },
    is_primary: { type: Boolean },
  },

  {
    versionKey: false,
  }
);

var job_title = new Schema(
  {
    title: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);
var job_type = new Schema(
  {
    type: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);
var jobPreferenceSchema = new Schema(
  {
    job_search_status: { type: String, required: true },
    job_types: [job_type],
    job_titles: [job_title],
    from_salary: { type: String, required: true },
    to_salary: { type: String, required: false },
    pay_period: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);

var location = new Schema(
  {
    place: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);
var industry_type = new Schema(
  {
    type: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);

var company_size = new Schema(
  {
    size: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);

var dream_company = new Schema(
  {
    company_name: { type: String, required: true },
  },

  {
    versionKey: false,
  }
);

var companyPreferenceSchema = new Schema(
  {
    locations: [location],
    relocation: { type: Boolean, required: true },
    remote: { type: Boolean, required: true },
    industry: [industry_type],
    company_sizes: [company_size],
    dream_companies: [dream_company],
  },
  {
    versionKey: false,
  }
);

var studentSchema = new Schema(
  {
    sql_student_id: { type: String, required: true },
    aboutMe: { type: String },
    experience: [experienceSchema],
    skills: [skillsSchema],
    education: [educationSchema],
    resumes: [resumeSchema],
    job_preferences: jobPreferenceSchema,
    company_preferences: companyPreferenceSchema,
    profile_picture: { type: String, required: false }
  },
  {
    versionKey: false,
  }
);

const StudentModel = mongoose.model('studentSchema', studentSchema, 'students');
module.exports = StudentModel;
