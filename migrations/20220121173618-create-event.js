'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try{
    await queryInterface.createTable('Events', {
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
      
    }, {transaction:t});
    await t.commit();
  }catch(err){
    await t.rollback();
    throw err;
  }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};