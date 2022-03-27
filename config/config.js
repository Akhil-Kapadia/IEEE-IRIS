const fs = require('fs');

module.exports = {
  "development": {
    "dialect" : "sqlite",
    "storage" : "./database.sqlite"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port" : process.env.DB_PORT,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port" : process.env.DB_PORT,
    "dialect": "postgres"
  }
}
