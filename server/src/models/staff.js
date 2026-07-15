const mongoose = require("mongoose");

const db_str_articles = process.env.MONGODB_URI_ARTICLES;
const articleConnection = mongoose.createConnection(db_str_articles);


const staffSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  slug: {
    required: true,
    type: String,
  },
  position: {
    type: String,
  },
  role: {
    type: String,
  },
  description: {
    type: String,
  },
  pfp_url: {
    type: String,
  },
  years: [
    {
      type: Number,
    },
  ],
  created_at: {
    type: Date,
    required: true,
  },
});

const staffModelfordb = articleConnection.model("staff", staffSchema);

module.exports = staffModelfordb;
