const router = require("express").Router();

const { getAllNews, getNewsById, createNews, updateNews, deleteNews } = require("../controllers/news");
const upload = require("../middleware/multer");

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.post("/", upload.single("img"), createNews);
router.put("/:id", upload.single("img"), updateNews);
router.delete("/:id", deleteNews);

module.exports = router;