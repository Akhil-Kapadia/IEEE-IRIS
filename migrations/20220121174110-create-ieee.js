'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try{
    await queryInterface.createTable('Ieee', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberId: {
        type: Sequelize.INTEGER
      },
      officer: {
        type: Sequelize.STRING
      },
      ferpa: {
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
      }
    }, {transaction:t});
    await t.commit();
  }catch(err){
    await t.rollback();
    throw err;
  }
  },
  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try{
    await queryInterface.dropTable('Ieee', {t});
    }catch(err){
      await t.rollback();
      throw err;
    }
  }
};