const express = require("express");
const api = express.Router();
const MovieController = require("../controllers/movie");

const connect = require("connect-multiparty");
const md_upload = connect({ uploadDir: "./uploads/movie" });

api.get("/movies", MovieController.getMovies);
api.post("/movie", [md_upload], MovieController.createMovie);
api.put("/movie/:id", [md_upload], MovieController.updateMovie);
api.delete("/movie/:id",MovieController.deleteMovie);


module.exports = api;
