const mongoose = require("mongoose");
const Staff = require("./staff");

const db_str_articles = process.env.MONGODB_URI_ARTICLES;
const articleConnection = mongoose.createConnection(db_str_articles);

const articleSchema = new mongoose.Schema({
  text: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  slug: {
    required: true,
    type: String,
  },
  contributors: {
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: Staff,
  },
  volume: {
    required: true,
    type: Number,
  },
  issue: {
    required: true,
    type: Number,
  },
  section_id: {
    required: true,
    type: Number,
  },
  summary: {
    required: true,
    type: String,
  },
  cover_image: {
    type: String,
  },
  cover_image_contributor: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Staff,
  },
  is_published: {
    required: true,
    type: Boolean,
  },
  sub_section: {
    type: String,
  },
  rank: {
    type: Number,
  },
});

const articleModel = articleConnection.model(
  "Article",
  articleSchema,
  "articles",
);

module.exports = articleModel;
