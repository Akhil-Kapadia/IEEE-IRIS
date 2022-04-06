'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint('students', {
        fields: ['UserId'],
        type: 'foreign key',
        name: 'students_fk',
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }, {t});
      await queryInterface.addConstraint('students', {
        fields: ['lab'],
        type: 'foreign key',
        name: 'students-courses_fk',
        references: {
          table: 'courses',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }, {t});
      await queryInterface.addConstraint('propoints', {
        fields: ['CourseId'],
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
      await queryInterface.removeConstraint('propoints', 'propoints-courses_fk', {t});
      await queryInterface.removeConstraint('students', 'students_fk', {t});
      await queryInterface.removeConstraint('students', 'students-courses_fk', {t});
      
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
