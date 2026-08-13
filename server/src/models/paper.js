const mongoose = require("mongoose");

const db_str = process.env.MONGODB_URI;
const pdfConnection = mongoose.createConnection(db_str);

const paperSchema = new mongoose.Schema({
  volume: { type: Number },
  issue: { type: Number },
  pdfLink: { type: String },
});

const paperModel = pdfConnection.model("Paper", paperSchema, "papers");
module.exports = paperModel;
