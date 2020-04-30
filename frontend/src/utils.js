import axios from 'axios';


export const apiPost = (endpoint, args) => {
  var param = {
    method: "POST",
    url: endpoint,
    headers: args.header,
    data: args.body
  };

  return axios(param);
}

export const apiGet = (endpoint, args) => {
  var param = {
    method: "GET",
    url: endpoint,
    headers: args.header,
    data: args.body
  };

  return axios(param);
}

export const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        // eslint-disable-next-line
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        // eslint-disable-next-line
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
};

export const createCookie = (cname, value, expiration) => {
    var expiry = new Date((new Date()).getTime() + expiration);
    document.cookie = cname + "=" + value + "; Path=/; Expires=" + String(expiry) + ";";
};

export const deleteCookie = (cname) => {
    document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

