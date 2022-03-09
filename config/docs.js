module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TTU IEEE Express API Documentation",
      version: "0.1.0",
      description:
        "This API provides functionality to the IEEE website and various other IEEE services at tech. The backend interfaces with a SQL database using Sequelize ORM and uses JWT as its authentication method. ",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Akhil Kapadia",
        url: "https://github.com/Akhil-Kapadia/IEEE-IRIS/",
        email: "akhilk2000@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/",
      },
    ],
  },
  apis: ["./routes/users.js"],
};