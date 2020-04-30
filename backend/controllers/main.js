const utils = require("../models/utils");

const News = require("../models/news")
const Weather = require("../models/weather")

var c = {};

c.root = async (req, res, next) => {
    const r = utils.responseJSON("200", "success", "Successful", {
        application: process.env.X_APP_NAME,
        author: process.env.X_APP_AUTHOR
    });
    res.status(r.code).json(r.body);
};

c.pageNotFound = async (req, res, next) => {
    const r = utils.responseJSON("404", "failed", "Page not found!", []);
    res.status(r.code).json(r.body);
};

c.news = async (req, res, next) => {
    var n = new News(req.params.q);
    n.query((r)=>{
        res.status(r.code).json(r.body);
    });
};

c.weather = async (req, res, next) => {
    var w = new Weather(req.params.q);
    w.query((r)=>{
        res.status(r.code).json(r.body);
    });
};

module.exports = c;