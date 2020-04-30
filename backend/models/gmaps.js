const utils = require("./utils");


class News {
    constructor(q) {
        this.url = process.env.X_GMAPS_API_URL;
        this.secret_key = process.env.X_GMAPS_API_SECRET_KEY;
        this.q = q;
    }
    async query(cb) {
        try {

            var d = new Date();
            // var mm = d.getMonth() - 1;
            // var dd = d.getDate();
            var yy = d.getFullYear();
            var myDateString = yy; //(US)

            console.log(myDateString);
            var xxx = await utils.apiGet(this.url + '/radius?' + utils.toUrlEncoded({
                radius: "5000",
                lon: this.q.lon,
                lat: this.q.lat,
                format: "json",
                apikey: this.secret_key
            }), {});
            cb(utils.responseJSON("200", "success", "Successful", xxx.data));
        }
        catch (error) {
            console.log(error);
            cb(utils.responseJSON("500", "failed", "Something went wrong!", {}));
        }
    }
}

module.exports = News;