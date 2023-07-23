const Awards = require("../../models/Awards.model");
const dayjs = require("dayjs");

const getAwards = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 10;
  const searchCriteria = {};

  if (req.query.status) {
    searchCriteria["$and"] = [
      {
        status: req.query.status,
      },
    ];
  }
  if (req.query.keyword) {
    searchCriteria["$and"] = [
      {
        firstName: { $regex: `^${req.query.keyword}`, $options: "i" },
      },
    ];
  }

  if (req.query.year) {
    searchCriteria["$and"] = [
      {
        date: {
          $gte: new Date(
            dayjs(`${req.query.year}-04-01T00:00:00Z`).toISOString()
          ),
          $lt: new Date(
            dayjs(`${+req.query.year + 1}-03-31T23:59:59Z`).toISOString()
          ),
        },
      },
    ];
  }
  console.log(searchCriteria);
  try {
    const awards = await Awards.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],

          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: startIndex,
            },
            {
              $limit: viewSize,
            },
          ],
        },
      },
    ]);

    res.json({
      success: true,
      message: "ContactUss fetched successfully",
      awardsData: awards[0]?.data,
      totalCount: awards?.[0]?.count?.[0]?.total,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAwards;
