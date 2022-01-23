'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try{
    await queryInterface.createTable('ProPoints', {
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
      UserId: {
        type: Sequelize.INTEGER,
      },
      EventId: {
        type: Sequelize.INTEGER,
      }
    }, {transaction:t});
    await t.commit();
  }catch(err){
    await t.rollback();
    throw err;
  }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProPoints');
  }
};