const router = require("express").Router();
const Paper = require("../models/paper");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("Welcome to the pdf route");
});

router.get("/volumes", async (req, res) => {
  try {
    const volumes = await Paper.distinct("volume");
    res.json(volumes);
  } catch (err) {
    next(err);
  }
});

router.get("/:volume", async (req, res, next) => {
  const volume = req.params.volume;
  const volumeNumber = Number(volume);
  //CALL MIDDLEWARE HERE
  try {
    if (Number.isNaN(volumeNumber)) throw new Error("Volume must be a number");
    const issues = await Paper.find({ volume: volumeNumber }).sort({
      issue: 1,
    });
    res.json(issues);
  } catch (err) {
    next(err);
  }
});

router.get("/:volume/:issue", async (req, res, next) => {
  const volume = req.params.volume;
  const issue = req.params.issue;

  const volumeNumber = Number(volume);
  const issueNumber = Number(issue);

  try {
    if (Number.isNaN(volumeNumber) || Number.isNaN(issueNumber))
      throw new Error("Volume and Issue must be a number.");

    const issue = await Paper.find({
      volume: volumeNumber,
      issue: issueNumber,
    });
    res.json(issue);
  } catch (err) {
    next(err);
  }
});

module.exports.router = router;
