"use strict";
const events = [
  {
    event: "Test Event",
    participants: 0,
    img: null,
    date: "2022-01-25T21:56:46.000Z",
    location: null,
    createdAt: "2022-01-25T21:56:53.307Z",
    updatedAt: "2022-01-25T21:56:53.307Z",
  },
  {
    event: "Soldering Tutorial 2 ",
    participants: 0,
    img: null,
    date: "2022-01-28T00:00:01.000Z",
    location: null,
    createdAt: "2022-01-28T00:09:16.495Z",
    updatedAt: "2022-01-28T00:09:16.495Z",
  },
  {
    event: "Grad Research Fair",
    participants: 0,
    img: null,
    date: "2022-02-11T01:00:14.000Z",
    location: null,
    createdAt: "2022-02-10T13:09:56.065Z",
    updatedAt: "2022-02-10T13:09:56.065Z",
  },
  {
    event: "Lab Walkthrough",
    participants: 0,
    img: null,
    date: "2022-02-12T01:00:09.000Z",
    location: null,
    createdAt: "2022-02-11T22:24:28.841Z",
    updatedAt: "2022-02-11T22:24:28.841Z",
  },
  {
    event: "Texas Instrument Career Meet",
    participants: 0,
    img: null,
    date: "2022-02-15T21:38:35.000Z",
    location: null,
    createdAt: "2022-02-15T21:38:51.167Z",
    updatedAt: "2022-02-15T21:38:51.167Z",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("events", events, { t });
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete("events", null, { t });
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
