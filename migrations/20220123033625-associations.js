'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint('ieee', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'ieee_fk',
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }, {transaction:t});

      await queryInterface.addConstraint('propoints', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'propoints-users_fk',
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },{transaction:t});

      await queryInterface.addConstraint('propoints', {
        fields: ['eventId'],
        type: 'foreign key',
        name: 'propoints-events_fk',
        references: {
          table: 'events',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },{transaction:t});
      await t.commit();

    }catch(err){
      await t.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint('ieee', 'ieee_fk',{t});
      await queryInterface.removeConstraint('propoints', 'propoints-events_fk',{t});
      await queryInterface.removeConstraint('propoints', 'propoints-users_fk',{t});
      await t.commit();
    }catch(err){
      await t.rollback();
      throw err;
    }

  }
};
