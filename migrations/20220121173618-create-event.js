'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event : {
        type: Sequelize.TEXT
      },
      participants : {
        type: Sequelize.INTEGER
      },
      img : {
        type: Sequelize.STRING
      },
      date : {
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
       },
      location: {
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
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};