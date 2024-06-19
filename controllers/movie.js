const movie = require("../models/movie");
const Movie = require("../models/movie");
const image = require("../utils/getFileName");
// crear
async function createMovie(req, res) {
  //res.status(200).send(req.body);

  const newMovie = new Movie(req.body);

  //req.file

  const imagePath = image.getFileName(req.files.image);
  newMovie.image = imagePath;

  console.log(newMovie);
  console.log(imagePath);

  //res.status(200).send({ msg: "ok sabe rr sabe" });

  try {
    await newMovie.save();
    res.status(200).send({ msg: "Success de pelicula" });
  } catch (err) {
    res.status(500).send({ msg: `error al crear la pelicula:${err} ` });
  }
}

async function getMovies(req, res) {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (err) {
    res.status(500).send({ msg: `error al crear la pelicula:${err}` });
  }
}

async function updateMovie(req, res) {
  const { id } = req.params;
  const movieData = req.body;

  if (req.files.image) {
    const imagePath = image.getFileName(req.files.image);
    movieData.image = imagePath;
  }

  try {
    await movie.findByIdAndUpdate({ _id: id }, movieData);
    res.status(200).send({ msg: "ok" });
  } catch (err) {
    res.status(400).send({ msg: "error al actualizado de peliculas" });
  }
}

async function deleteMovie(req, res) {
  const { id } = req.params;

  try {
    await movie.findByIdAndDelete( id );
    res.status(200).send({ msg: "pelicula eleminadaaa" });
  } catch (err) {
    res.status(400).send({ msg: "error al eliminar la peliculas" });
  }
}

module.exports = {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
};
