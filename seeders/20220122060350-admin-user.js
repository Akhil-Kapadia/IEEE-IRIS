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
     password: await bcrypt.hash("zqP$sGf5", 10),
     classification: 'EE',
     alumni: true,
     createdAt: new Date(),
     updatedAt: new Date()
   }], {transaction: t});
   await queryInterface.bulkInsert('Ieee', [{
     memberId: 101,
     officer: "Admin",
     ferpa: '/public/ferpa/1',
     UserId: 10000000,
     createdAt: new Date(),
     updatedAt: new Date
   }], {transaction:t})
   await t.commit();
  }catch(err){
    await t.rollback();
    throw err;
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
