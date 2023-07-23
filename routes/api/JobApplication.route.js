const router = require("express").Router();

const createJob = require("../../controllers/jobApplication/createJob");
const getJob = require("../../controllers/jobApplication/getJob");
const getSingleJob = require("../../controllers/jobApplication/getSingleJob");
const validateAccessToken = require("../../middlewares/jwtValidation");

router.post("/create", createJob);
router.get("/", getJob);
router.get("/:id", getSingleJob);

module.exports = router;
