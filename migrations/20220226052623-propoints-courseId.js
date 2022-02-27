'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn(
        "ProPoints",
        "courseId",
        {allowNull: true},
        {t}
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      const t = await queryInterface.sequelize.transaction();
      await queryInterface.changeColumn(
        "ProPoints",
        "courseId",
        {allowNull: false},
        {t}
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  }
};
