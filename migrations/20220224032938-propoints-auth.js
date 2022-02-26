"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "ProPoints",
        "confirmedBy",
        {type: Sequelize.DataTypes.STRING},
        {t}
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('ProPoints', 'confirmedBy', {t});
    } catch (err) {
      t.rollback();
    }
  },
};
