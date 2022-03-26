'use strict';

const course = [
  {
    name: "Test Course",
    CourseId: 1001,
    section: 101,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "Robotics Project Lab",
    CourseId: 3331,
    section: 304,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "Robotics Project Lab",
    CourseId: 3331,
    section: 305,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "Robotics Project Lab",
    CourseId: 3331,
    section: 306,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "MicroController Project Lab",
    CourseId: 3332,
    section: 302,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "MicroController Project Lab",
    CourseId: 3332,
    section: 303,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "RF Communications Project Lab",
    CourseId: 3333,
    section: 303,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "Digital Communications Project Lab",
    CourseId: 3334,
    section: 301,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "Capstone Project Lab",
    CourseId: 4333,
    section: 302,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "Capstone Project Lab",
    CourseId: 4333,
    section: 30,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  },
  {
    name: "Advanced Capstone Project Lab",
    CourseId: 4334,
    section: 302,
    dept: "ECE",
    semester: 'Spring 2022',
    createdAt: "2022-01-26T20:42:02.564Z",
    updatedAt: "2022-01-26T20:42:02.593Z",
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("courses", course, { t });
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete("courses", null, { t });
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
