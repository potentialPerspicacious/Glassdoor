const review = require('../models/review');
const interview = require('../models/interview');
const salary = require('../models/salary');
const paginate = require('jw-paginate');

module.exports.searchService = function (msg, callback) {
  console.log('In review service path', msg.path);
  switch (msg.path) {
    case 'searchByCompany':
      searchByCompany(msg, callback);
      break;
  }
};

async function searchByCompany(msg, callback) {
  console.log('In search by company details topic service. Msg: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  const page = parseInt(msg.page) || 1;
  await review.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: '$sql_company_id',
          reviews: { $sum: 1 },
          rating: { $avg: '$rating' },
        },
      },
    ],
    function (err, results) {
      console.log('Results:', results);

      for (each of results) {
        msg.body[each._id].reviews = each.reviews;
        msg.body[each._id].rating = each.rating.toFixed(1);
      }
    }
  );
  await salary.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: '$sql_company_id',
          salaries: { $sum: 1 },
        },
      },
    ],
    function (err, results) {
      console.log('Results:', results);

      for (each of results) {
        msg.body[each._id].salaries = each.salaries;
      }
    }
  );
  await interview.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: '$sql_company_id',
          interviews: { $sum: 1 },
        },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      for (each of results) {
        msg.body[each._id].interviews = each.interviews;
      }
      console.log('msg.body:', msg.body);
      const pager = paginate(ids.length, page, 5);
      const pageOfItems = Object.keys(msg.body)
        .slice(pager.startIndex, pager.endIndex + 1)
        .map((key) => msg.body[key]);
      final_result = { pager: pager, items: pageOfItems };
    }
  );

  callback(null, final_result);
  // .find({ sql_company_id: { $in: ids } }, function (err, result) {
  //   console.log("reviews list:", result);
  //   callback(null, result);
  // });
}
