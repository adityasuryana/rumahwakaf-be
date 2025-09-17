const router = require("express").Router();

const newsRouter = require("./news");
const rekeningRouter = require("./rekening");
const userRouter = require("./user");
const authRouter = require("./auth");

router.use("/news", newsRouter);
router.use("/rekening", rekeningRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;