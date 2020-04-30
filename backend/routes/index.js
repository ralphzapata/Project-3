var express = require('express');
var r = express.Router();

const controller = {
  main: require("../controllers/main")
};

// API root URL
r.route("/").get(controller.main.root)

// NEWS API
r.route("/news/:q").get(controller.main.news)

// WEATHER API
r.route("/weather/:q").get(controller.main.weather)

// Handling router not found
r.route("*")
  .get(controller.main.pageNotFound);

module.exports = r;
