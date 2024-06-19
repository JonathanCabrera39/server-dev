const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  title: String,
  releaseYear: Number,
  genre: String,
  director: String,
  actors: String,
  rating: String,
  image: String,
});

module.exports = mongoose.model("movie", MovieSchema);
