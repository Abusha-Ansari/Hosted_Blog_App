const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  id: {
    type: Number,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
  },
  user: {
    type: String,
    require: true,
  },
});

const blogData = new mongoose.model("Blogs", blogSchema);
module.exports = blogData;
