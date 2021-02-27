'use strict';

const Review = require('../models/review');
const redisClient = require('../config/redisConfig');
const sqlDB = require('../config/sqlConfig');

exports.reviewService = function (msg, callback) {
  console.log('In reviewService - path:', msg.path);
  switch (msg.path) {
    case 'getAllReviews':
      getAllReviews(msg, callback);
      break;

    case 'companyReviews':
      companyReviews(msg, callback);
      break;

    case 'updateFavFeatured':
      updateFavFeatured(msg, callback);
      break;

    case 'getStudentReviews':
      getStudentReviews(msg, callback);
      break;
    case 'reviewsPerDay':
      ReviewsPerDay(msg, callback);
      break;

    case 'mostReviewed':
      MostReviewed(msg, callback);
      break;
    case 'topRated':
      TopRated(msg, callback);
      break;
    case 'insertReviewDetails':
      insertReviewDetails(msg, callback);
      break;
    case 'getReviewDetails':
      getReviewDetails(msg, callback);
      break;
    case 'getFeaturedReview':
      getFeaturedReview(msg, callback);
      break;
    case 'getPositiveReview':
      getPositiveReview(msg, callback);
      break;
    case 'getNegativeReview':
      getNegativeReview(msg, callback);
      break;
    case 'getOverallRating':
      getOverallRating(msg, callback);
      break;
    case 'updateHelpful':
      updateHelpful(msg, callback);
      break;
    case 'updateApproved':
      updateApproved(msg, callback);
      break;
    case 'topStudents':
      TopStudents(msg, callback);
      break;
    case 'topCeo':
      TopCeo(msg, callback);
      break;
  }
};

async function insertReviewDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In add review topic service. Msg: ', msg);
  let companyId = '';
  let sql = `Call get_sqlCompanyId('${msg.body.company}');`;
  try {
    sqlDB.query(sql, async (err, result) => {
      if (err) {
        error.message = err;
        error.status = 500;
        return callback(null, error);
      } else {
        companyId = result[0][0].id;
        let iObj = new Review({
          sql_company_id: companyId,
          sql_student_id: msg.body.sql_student_id,
          rating: msg.body.rating,
          company: msg.body.company,
          headline: msg.body.headline,
          job_title: msg.body.job_title,
          description: msg.body.description,
          pros: msg.body.pros,
          cons: msg.body.cons,
          ceo_rating: msg.body.ceo_rating,
          recommended: msg.body.recommended,
        });
        let newReview = await iObj.save();
        if (!newReview) {
          response.status = 500;
          response.data = 'Data error';
          return callback(null, response);
        } else {
          response.status = 200;
          response.message = 'Inserted Successfully';
          response.data = JSON.stringify(newReview);
          return callback(null, response);
        }
      }
    });
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = 'Error in Data';
    return callback(err, null);
  }
}

async function getReviewDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In getReviewDetails service. Msg: ', msg);
  console.log(msg.body);

  redisClient.get('allReviews', function (err, data) {
    if (err) {
      console.log('error');
      response.status = 400;
    } else {
      console.log('fetching from mongoDb');
      Review.find(
        { company: msg.body, approvedstatus: 'Approved' },
        function (err, doc) {
          if (err || !doc) {
            response.status = 400;
          } else {
            response.status = 200;
            response.data = doc;
            return callback(null, response);
          }
        }
      );
    }
  });
}

async function companyReviews(msg, callback) {
  let err = {};
  let response = {};
  console.log('In company reviews service. Msg: ', msg);
  console.log('fetching from mongoDb');
  Review.find({ company: msg.body, approvedstatus: 'Approved' })
    .then((rev) => {
      response.status = 200;
      response.data = rev;
      response.message = 'REVIEW_FETCHED';
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateFavFeatured(msg, callback) {
  let err = {};
  let response = {};
  console.log('In updateCompanyDetails service. Msg: ', msg);

  if (msg.colValue == 'favourite') {
    await Review.findByIdAndUpdate(
      { _id: msg.id },
      { favorite: true },
      { safe: true, new: true, useFindAndModify: false }
    )
      .then((user) => {
        console.log(user);
        console.log('Review marks as favourite');
        response.status = 200;
        response.message = 'REVIEW_UPDATED';
        return callback(null, response);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await Review.findByIdAndUpdate(
      { _id: msg.id },
      { featured: true },
      { safe: true, new: true, useFindAndModify: false }
    )
      .then((user) => {
        console.log(user);
        console.log('Review marks as featured');
        response.status = 200;
        response.message = 'REVIEW_UPDATED';
        return callback(null, response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function ReviewsPerDay(msg, callback) {
  var d = new Date();
  console.log('date:', d);

  await Review.aggregate(
    [
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
            year: { $year: '$date' },
          },
          reviews: { $sum: 1 },
        },
      },
      {
        $match: {
          '_id.month': { $eq: d.getMonth() },
          '_id.day': { $eq: d.getDay() },
          '_id.year': { $eq: d.getFullYear() },
        },
      },
      {
        $count: 'total',
      },
    ],
    function (err, results) {
      console.log('in reviewsPerday Results:', results);
      let output = { total: results.total ? results.total : 0 };
      callback(null, output);
    }
  );
}

async function MostReviewed(msg, callback) {
  console.log('In ReviewsPerDay: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  const page = parseInt(msg.page) || 1;
  await Review.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: '$sql_company_id',

          reviews: { $sum: 1 },
        },
      },
      {
        $sort: { reviews: -1 },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      let output = [];
      if (results.length > 5) {
        results = results.slice(0, 5);
      }
      let reviews = [];
      let names = [];
      for (var each of results) {
        names.push(msg.body[each._id].name);
        reviews.push(parseInt(each.reviews));
        each.name = msg.body[each._id].name;
        msg.body[each._id].reviews = each.reviews;
        let val = { [msg.body[each._id].name]: msg.body[each._id] };
        output.push(val);
      }
      let final_output = { names: names, reviews: reviews };
      console.log('Results:', results);
      callback(null, final_output);
    }
  );
}

async function TopRated(msg, callback) {
  console.log('In top rated company: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  const page = parseInt(msg.page) || 1;
  await Review.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: '$sql_company_id',

          avgrating: { $avg: '$rating' },
        },
      },
      {
        $sort: { avgrating: -1 },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      let output = [];
      if (results.length > 5) {
        results = results.slice(0, 5);
      }
      let avgrating = [];
      let names = [];
      for (var each of results) {
        names.push(msg.body[each._id].name);
        avgrating.push(parseFloat(each.avgrating).toFixed(1));
        each.name = msg.body[each._id].name;
        msg.body[each._id].avgrating = each.avgrating;
        let val = { [msg.body[each._id].name]: msg.body[each._id] };
        output.push(val);
      }
      let final_output = { names: names, avgrating: avgrating };
      console.log('Results:', results);
      callback(null, final_output);
    }
  );
}

async function getStudentReviews(msg, callback) {
  let err = {},
    response = {};
  console.log('get Student Reviews: ', msg);
  await Review.find({ sql_student_id: msg.userId }, (result, error) => {
    if (error) {
      err.message = error;
      err.status = 500;
      return callback(null, error);
    } else if (result) {
      console.log(results);
      response.status = 200;
      response.message = 'STUDENT_REVIEWS';
      response.data = JSON.stringify(result[0]);
      return callback(null, response);
    }
  });
}

async function getFeaturedReview(msg, callback) {
  let err = {};
  let response = {};
  console.log('In getFeaturedReview service. Msg: ', msg);
  console.log(msg.body);
  Review.find({ company: msg.body, featured: true })
    .then((user) => {
      console.log(user);
      console.log('Featured Review');
      response.status = 200;
      response.data = user;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getPositiveReview(msg, callback) {
  let err = {};
  let response = {};
  console.log('In getPositiveReview service. Msg: ', msg);
  console.log(msg.body);
  Review.find({ $query: { company: msg.body, status: true } })
    .sort({ helpful: -1 })
    .limit(1)
    .then((user) => {
      console.log(user);
      console.log('Positive Review');
      response.status = 200;
      response.data = user;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getNegativeReview(msg, callback) {
  let err = {};
  let response = {};
  console.log('In getNegativeReview service. Msg: ', msg);
  console.log(msg.body);
  Review.find({ $query: { company: msg.body, status: false } })
    .sort({ helpful: -1 })
    .limit(1)
    .then((user) => {
      console.log(user);
      console.log('Negative Review');
      response.status = 200;
      response.data = user;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getOverallRating(msg, callback) {
  let err = {};
  let response = {};
  console.log('In getNegativeReview service. Msg: ', msg);
  console.log(msg.body);
  Review.aggregate([
    {
      $group: {
        _id: '$company',
        avgRating: { $avg: '$rating' },
        ceoRating: { $avg: '$ceo_rating' },
        recommended: { $avg: '$recommended' },
      },
    },
    { $match: { _id: msg.body } },
  ])
    .then((user) => {
      console.log(user);
      console.log('average rating');
      response.status = 200;
      response.data = user;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateHelpful(msg, callback) {
  let err = {};
  let response = {};
  console.log('In updateCompanyDetails service. Msg: ', msg);

  if (msg.colValue == 'favourite') {
    await Review.findByIdAndUpdate(
      { _id: msg.id },
      { favorite: true },
      { safe: true, new: true, useFindAndModify: false }
    )
      .then((user) => {
        console.log(user);
        console.log('Review marks as favourite');
        response.status = 200;
        response.message = 'REVIEW_UPDATED';
        return callback(null, response);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await Review.findByIdAndUpdate(
      { _id: msg.id },
      { featured: true },
      { safe: true, new: true, useFindAndModify: false }
    )
      .then((user) => {
        console.log(user);
        console.log('Review marks as featured');
        response.status = 200;
        response.message = 'REVIEW_UPDATED';
        return callback(null, response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function getAllReviews(msg, callback) {
  let err = {};
  let response = {};
  console.log('In admin all reviews service. Msg: ', msg);

  redisClient.get('allReviews', function (err, data) {
    if (err) {
      console.log('error');
      response.status = 400;
    } else if (data) {
      console.log('fetching from redis cache');
      console.log(data);
      response.status = 200;
      response.data = JSON.parse(data);
      // console.log(response);
      return callback(null, response);
    } else {
      console.log('fetching from mongoDb');
      Review.find({})
      .then ((rev) => {
        redisClient.setex("allReviews", 36000, JSON.stringify(rev));
        response.status = 200;
        response.data = rev;
        response.message = 'REVIEW_FETCHED';
        return callback(null, response);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });
}

async function updateApproved(msg, callback) {
  let err = {};
  let response = {};
  console.log('In update review approved service. Msg: ', msg);

  await Review.findByIdAndUpdate(
    { _id: msg.id },
    { approvedstatus: msg.body },
    { safe: true, new: true, useFindAndModify: false }
  )
    .then((user) => {
      console.log(user);
      console.log('Review marks as favourite');
      redisClient.del('allReviews')
      response.status = 200;
      response.message = 'REVIEW_UPDATED';
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function TopStudents(msg, callback) {
  await Review.aggregate(
    [
      {
        $match: { approvedstatus: { $eq: 'Approved' } },
      },
      {
        $group: {
          _id: { sql_student_id: '$sql_student_id' },

          number: { $sum: 1 },
        },
      },
      {
        $sort: { number: -1 },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      // let output = [];
      if (results.length > 5) {
        results = results.slice(0, 5);
      }
      let number = [];
      let student_ids = [];
      let output = {};
      for (var each of results) {
        output[each._id.sql_student_id] = each.number;
        student_ids.push(each._id.sql_student_id);
        number.push(parseInt(each.number));
      }
      let final_output = { student_ids: student_ids, number: number };
      callback(null, output);
    }
  );
}

async function TopCeo(msg, callback) {
  console.log('In top rated company: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  const page = parseInt(msg.page) || 1;
  await Review.aggregate(
    [
      {
        $match: { ceo_rating: { $eq: 1 } },
      },
      {
        $group: {
          _id: '$sql_company_id',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      let output = [];
      if (results.length > 5) {
        results = results.slice(0, 5);
      }
      let count = [];
      let names = [];
      console.log('msg.body:', msg.body);
      for (var each of results) {
        names.push(msg.body[each._id].ceo_name);
        count.push(parseInt(each.count));
      }
      let final_output = { names: names, count: count };

      callback(null, final_output);
    }
  );
}
