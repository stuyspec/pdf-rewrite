const router = require("express").Router();
const Article = require("../models/article");
const Staff = require("../models/staff");
const { Types } = require("mongoose");

router.get("/", (req, res) => {
  res.send("Welcome to the aricle router section!");
});


router.get("/staff/:id", async (req, res, next) => {
  const staff = req.params.id;
  try {
    const fetchedStaff = await Staff.findById(staff).select("name");
    res.json(fetchedStaff);
  } catch (err) {
    next(err);
  }
});

router.get("/:volume/:issue", async (req, res, next) => {
  const volume = req.params.volume;
  const issue = req.params.issue;
  try {
    const volumeNumber = Number(volume);
    const issueNumber = Number(issue);
    if (Number.isNaN(volumeNumber)) throw new Error("Volume must be a number.");
    if (Number.isNaN(issueNumber)) throw new Error("Issue must be a number.");

    const articles = await Article.find({
      volume: volumeNumber,
      issue: issueNumber,
    }).select("contributors title section_id slug").populate("contributors", "name");
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

module.exports.router = router;
