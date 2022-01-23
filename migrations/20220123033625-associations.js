'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint('Ieee', {
        fields: ['UserId'],
        type: 'foreign key',
        name: 'Users Ieee fk',
        references: {
          table: 'Users',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }, {transaction:t});

      await queryInterface.addConstraint('ProPoints', {
        fields: ['UserId'],
        type: 'foreign key',
        name: 'Users ProPoints fk',
        references: {
          table: 'Users',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },{transaction:t});

      await queryInterface.addConstraint('ProPoints', {
        fields: ['EventId'],
        type: 'foreign key',
        name: 'Events ProPoints fk',
        references: {
          table: 'Events',
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
      await queryInterface.removeConstraint('Ieee', 'Users Ieee fk',{t});
      await queryInterface.removeConstraint('ProPoints', 'Users ProPoints fk',{t});
      await queryInterface.removeConstraint('ProPoints', 'Events ProPoints fk',{t});
      await t.commit();
    }catch(err){
      await t.rollback();
      throw err;
    }

  }
};
