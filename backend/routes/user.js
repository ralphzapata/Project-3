var express = require('express');
var r = express.Router();

const controller = {
  user: require("../controllers/user")
};

r.route("/")
  .post(controller.user.create);

r.route("/login")
  .post(controller.user.login);

module.exports = r;
