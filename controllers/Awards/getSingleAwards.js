const Awards = require("../../models/Awards.model");

const getSingleAwards = async (req, res, next) => {
  try {
    const { awardId } = req.params;
    const awards = await Awards.findOne({ _id: awardId });
    res.status(200).json({
      message: "success",
      awards,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getSingleAwards;
