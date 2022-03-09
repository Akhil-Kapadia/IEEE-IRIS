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
  "production": {
    "username": process.env.PG_DBUSER,
    "password": process.env.PG_DBPASS,
    "database": process.env.PG_DBNAME,
    "host": process.env.PG_DBHOST,
    "port" : process.env.PG_DBPORT,
    "dialect": "postgres"
  }
}
