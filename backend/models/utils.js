
var axios = require('axios');
var https = require('https');

var u = {};

u.responseJSON = (code, status, desc, body) => {
    return {
        "code": code,
        "body": {
            "status": status,
            "description": desc,
            "body": body
        }
    }
};
u.toUrlEncoded = obj =>
  Object.keys(obj)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

u.apiPost = (endpoint, args) => {
  var param = {
    method: "POST",
    url: endpoint,
    headers: args.header,
    data: args.body
  };
  if (args.allowUnathorized)
    param['httpsAgent'] = new https.Agent({
      rejectUnauthorized: false
    });

  return axios(param);
}

u.apiGet = (endpoint, args) => {
  var param = {
    method: "GET",
    url: endpoint,
    headers: args.header,
    data: args.body
  };
  if (args.allowUnathorized)
    param['httpsAgent'] = new https.Agent({
      rejectUnauthorized: false
    });

  return axios(param);
}

module.exports = u;