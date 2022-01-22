'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('propoints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      points: {
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      confirmed : {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      courseId : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      description : {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'events',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('propoints');
  }
};