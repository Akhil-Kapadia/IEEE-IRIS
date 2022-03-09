'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.query(
        "ALTER TABLE \"ProPoints\" ALTER COLUMN \"courseId\" DROP NOT null;"
        , {t});
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.query(
        "ALTER TABLE \"ProPoints\" ALTER COLUMN \"courseId\" SET NOT null;"
        ,{t});;
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  }
};
