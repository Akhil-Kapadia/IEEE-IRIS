'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
   await queryInterface.bulkInsert('Users', [{
     id : 10000000,
     firstname: 'Iris',
     lastname: 'Admin',
     email: 'ieee@ttu.edu',
     password: "$2a$10$qESXwfc5ObrOyhJyhqPo8OGVwpJICVU1P5b.AnH6VT4pxp0WdSUNq",
     createdAt: new Date(),
     updatedAt: new Date()
   }], {transaction: t});
   await queryInterface.bulkInsert('Ieee', [{
     memberId: 101,
     officer: "Admin",
     ferpa: '/public/ferpa/1',
     userId: 10000000,
     createdAt: new Date(),
     updatedAt: new Date
   }], {transaction:t})
   await t.commit();
  }catch(err){
    await t.rollback();
    console.log(err.name);
  }
  },

  async down (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try{
    await queryInterface.bulkDelete('users', {id:10000000}, {transaction:t});
    await queryInterface.bulkDelete('ieee', {userId:10000000}, {transaction:t});
    await t.commit();
  }catch(err){
    await t.rollback();
    throw err;
  }
  }
};
