const utils = require("./utils");


class Weather {
    constructor(q) {
        this.url = process.env.X_WEATHER_API_URL;
        this.secret_key = process.env.X_WEATHER_API_SECRET_KEY;
        this.q = q;
    }
    async query(cb) {
        try {
            var d = new Date();
            var mm = d.getMonth() - 1;
            var dd = d.getDate();
            var yy = d.getFullYear();
            var myDateString = yy + '-' + mm + '-' + dd; //(US)

            console.log(myDateString);
            var xxx = await utils.apiGet(this.url + '/forecast?' + utils.toUrlEncoded({
                q: this.q,
                APPID: this.secret_key
            }), {});
            var nl = [];
            var num = 0;
            for (var i = 0; i < xxx.data.list.length; i++){
                console.log(xxx.data.list[i].dt_txt);
                if (xxx.data.list[i].dt_txt.includes("12:00:00") && num < 6){
                    num++;
                    nl.push(xxx.data.list[i]);
                }
                    
            }
            var result = {
                city_info: xxx.data.city,
                current: nl
            }
            cb(utils.responseJSON("200", "success", "Successful", [result]));
        }
        catch (error) {
            cb(utils.responseJSON("500", "failed", "Something went wrong!", {}));
        }
    }
}

module.exports = Weather;