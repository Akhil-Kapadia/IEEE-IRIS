'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      CourseId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      section: {
        type: Sequelize.INTEGER
      },
      dept: {
        defaultValue: 'ECE',
        type: Sequelize.STRING
      },
      semester: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};