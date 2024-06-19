require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiVersion = process.env.API_VERSION;

const app = express();

//configuration haader http -cors
app.use(cors());

// import rutas
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const movieRoutes = require("./router/movie");

//configuration body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configuration static folder
app.use(express.static("uploads"));

//configuration rutas
app.use(`/api/${apiVersion}`, authRoutes);
app.use(`/api/${apiVersion}`, userRoutes);
app.use(`/api/${apiVersion}`, movieRoutes);

module.exports = app;
