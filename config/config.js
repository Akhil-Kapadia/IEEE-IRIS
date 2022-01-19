const fs = require('fs');

module.exports = {
  "development": {
    "username": "iris",
    "password": "password",
    "database": "iris",
    "host": "127.0.0.1",
    "dialect": "sqlite"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
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
