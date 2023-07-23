const News = require("../../models/News.model");
const getNews = async (req, res, next) => {
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
    searchCriteria["$or"] = [
      {
        name: { $regex: `^${req.query.keyword}`, $options: "i" },
      },
    ];
  }

  try {
    const news = await News.aggregate([
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
      message: "News fetched successfully",
      newsData: news[0]?.data,
      totalCount: news?.[0]?.count?.[0]?.total,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getNews;
