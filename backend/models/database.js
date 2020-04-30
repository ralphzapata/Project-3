const mysql = require("mysql");


class Database {
    constructor() {
      this.credentials = {
        host: process.env.X_DB_HOST,
        port: process.env.X_DB_PORT,
        user: process.env.X_DB_USER,
        password: process.env.X_DB_PASSWORD,
        database: process.env.X_DB_NAME
      };
    }
    query(sql, args) {
      return new Promise((resolve, reject) => {
        try {
          this.connection = mysql.createConnection(this.credentials);
          this.connection.query(sql, args, (err, rows) => {
            this.connection.end();
            if (err) return reject(err);
            resolve(rows);
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  }
  
  module.exports = Database;
  