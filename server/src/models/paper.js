const mongoose = require("mongoose");


const db_str_pdf = process.env.MONGODB_URI_PDF;
const pdfConnection = mongoose.createConnection(db_str_pdf);

const paperSchema = new mongoose.Schema({
  volume: { type: Number },
  issue: { type: Number },
  pdfLink: { type: String },
});

const paperModel = pdfConnection.model("Paper", paperSchema, "papers");
module.exports = paperModel;
