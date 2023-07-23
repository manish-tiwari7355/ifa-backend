const router = require("express").Router();

const addAlumni = require("../../controllers/alumni/addAlumni");
const deleteAlumni = require("../../controllers/alumni/deleteAlumni");
const getAllAlumni = require("../../controllers/alumni/getAllAlumni");

router.post("/add", addAlumni);
router.get("/", getAllAlumni);
router.delete("/:id",deleteAlumni);

module.exports = router;
