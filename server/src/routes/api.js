const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("Welcome to the api world!");
  res.send("Welcome to the api route");
});

const articleRouter = require("./articleRouter").router;
router.use("/article", articleRouter);

const pdfRouter = require("./pdfRouter").router;
router.use("/pdf", pdfRouter);

module.exports.router = router;
