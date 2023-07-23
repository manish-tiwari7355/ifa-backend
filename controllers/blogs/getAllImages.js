const Blog = require("../../models/Blog.model");
const Awards = require("../../models/Awards.model");
const JobApplication = require("../../models/JobApplications.model");

const getAllImages = async (req, res, next) => {
  try {
    const blogs = await Blog.aggregate([
      {
        $match: {},
      },
      {
        $unwind: {
          path: "$media",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    const image1 = blogs?.map((item) => {
      return {
        url: item.media?.url,
        _id: item._id,
        description: item?.altDescription ? item.altDescription : "",
      };
    });

    const awards = await Awards.aggregate([
      {
        $match: {},
      },
      {
        $unwind: {
          path: "$media",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    const image2 = awards?.map((item) => {
      return {
        url: item.media?.url,
        _id: item._id,
        description: item?.altDescription ? item.altDescription : "",
      };
    });

    const alldata = [...image1, ...image2];

    res.json({
      success: true,
      message: "Images fetched successfully",
      alldata: alldata.flat(),
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getAllImages;
