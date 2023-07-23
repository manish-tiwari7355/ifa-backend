const router = require("express").Router();

const addBooks = require("../../controllers/books/books");
const deleteBooks = require("../../controllers/books/deleteBooks");
const getAllBooks = require("../../controllers/books/getAllBooks");
const updateBooks = require("../../controllers/books/updateBooks");
const getSingleBook = require("../../controllers/books/getSingleBook")

router.post("/add", addBooks);
router.delete("/:id", deleteBooks);
router.get("/", getAllBooks);
router.put("/:id", updateBooks);
router.get("/:id",getSingleBook)

module.exports = router;
