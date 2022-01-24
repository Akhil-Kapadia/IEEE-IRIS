const fs = require('fs');

module.exports = {
  "development": {
    "dialect" : "sqlite",
    "storage" : "./database.sqlite"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "Production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port" : process.env.DB_PORT,
    "dialect": "postgres"
  }
}
