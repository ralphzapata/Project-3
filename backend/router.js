var express = require('express');
const path = require('path');
var router = express.Router();


const routes = {
  main: require("./routes"),
  user: require("./routes/user")
};

/* Frontend Web Server */

/* API */
const apiDir = "/api";
router.use(apiDir + '/user', routes.user);
router.use(apiDir + '/', routes.main);

router.use(express.static("build"))
router.use('*', (req, res) => {
  console.log(path.join(__dirname, './' + "build" + '/'));
  res.sendFile("index.html", {
    root: path.join(__dirname, './' + "build" + '/')
  });
})

module.exports = router;
