const User = require("../models/user");

var c = {};

c.create = async (req, res, next) => {
  const user = new User(req.body);
  user.create(
    r => {
      res.status(r.code).json(r.body);
    }
  );
};

c.login = async (req, res, next) => {
  const user = new User(req.body);
  user.login(
    r => {
      res.status(r.code).json(r.body);
    }
  );
};

module.exports = c;