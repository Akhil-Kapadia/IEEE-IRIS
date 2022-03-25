'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint('students', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'students_fk',
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }, {t});
      await queryInterface.addConstraint('propoints', {
        fields: ['courseId'],
        type: 'foreign key',
        name: 'propoints-courses_fk',
        references: {
          table: 'courses',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }, {t});
      
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeContraint('students', 'students_fk', {t});
      await queryInterface.removeContraint('courses', 'propoints-courses_fk', {t});
      
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
