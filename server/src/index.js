const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
app.use(cors());

//FOR LIMITING
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});
app.use(limiter);

//FOR SLOWING DOWN
const speedLimiter = slowDown({
  windowMs: 60 * 1000,
  delayAfter: 50,
  delayMs: () => 1000,
});
app.use(speedLimiter);

const massInfluxSpeedLimiter = slowDown({
  windowMs: 60 * 1000,
  delayAfter: 75,
  delayMs: () => 2000,
});
app.use(massInfluxSpeedLimiter);

const apiRouter = require("./routes/api").router;
app.use("/api/", apiRouter);

app.get("/", function (req, res) {
  res.send("Hello World to the backend");
});

const middlewares = require("./middlewares");
app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
