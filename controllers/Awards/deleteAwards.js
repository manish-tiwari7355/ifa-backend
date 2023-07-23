const { ObjectId } = require("mongoose").Types;
const Awards = require("../../models/Awards.model");

const deleteAwards = async (req, res, next) => {
  try {
    const { awardId } = req.params;
    const data1 = await Awards.findOneAndDelete({ _id: ObjectId(awardId) });

    res.status(200).json({
      message: "Awards deleted successfully",
      data: data1,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteAwards;
