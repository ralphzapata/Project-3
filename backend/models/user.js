const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const Database = require("./database");
const utils = require("./utils");

const api_secret_key = process.env.X_API_SECRET_KEY,
  api_encryption_algorithm = process.env.X_API_ENCRYPT_ALGO,
  api_token_expiry = process.env.X_API_EXPIRY,
  api_token_expiry_format = "seconds",
  api_jwt_option = {
    algorithm: api_encryption_algorithm,
    expiresIn: api_token_expiry
  };

const checkPassword = (pw, dbpw) => {
  return bcrypt.compare(pw, dbpw)
}

const hashPassword = (pw) => {
  return bcrypt.hash(pw, 10)
}

const getUserDetails = async (args) => {
  const db = new Database();
  const query = `
    SELECT *
    FROM users_x
    WHERE username = ?
  `;

  const param = [
    args.username
  ];

  return db.query(query, param);
};
const createUser = async (args) => {
  args.password = await hashPassword(args.password)

  const db = new Database();
  const query = `
    INSERT INTO users_x (username, password, last_name, first_name, city, created_t)
    VALUES (?,?,?,?,?,UNIX_TIMESTAMP())
  `;

  const param = [
    args.username,
    args.password,
    args.last_name,
    args.first_name,
    args.city
  ];

  return db.query(query, param);
};

class User {
  constructor(request) {
    this.req = request;

  }
  async create(cb) {
    try {
      await createUser(this.req);
      cb(utils.responseJSON("201", "success", "Successfully created user.", []))
    } catch (error) {
      cb(utils.responseJSON("500", "failed", error.code, []))
    }
  }
  async login(cb) {
    try {
      // Check if user exists
      const getUserDetailsResult = await getUserDetails(this.req);
      if (getUserDetailsResult.length == 0) {
        cb(utils.responseJSON("401", "falied", "User does not exist!", []));
        return;
      }

      // Get user result from the database and compare to inputted password
      const dbpw = getUserDetailsResult[0].password;
      const pwchecking = await checkPassword(this.req.password, dbpw);
      if (!pwchecking) {
        cb(utils.responseJSON("401", "falied", "Password did not match!", []));
        return;
      }

      // Generate token that will be used for other API
      // Currently expires after 1 day
      const payload = {};
      const token = jwt.sign(payload, api_secret_key, api_jwt_option);

      cb(utils.responseJSON("200", "success", "Successfully logged in.", {
        "header_key": "X-TRAVELVERSE-ACCESS-TOKEN",
        "token": token,
        "expiration": api_token_expiry,
        "expiration_format": api_token_expiry_format
      }))
    } catch (error) {
      console.log(error);
      console.log(utils.responseJSON("500", "failed", error.code, []));
      cb(utils.responseJSON("500", "failed", error.code, []))
    }
  }
}

module.exports = User;
