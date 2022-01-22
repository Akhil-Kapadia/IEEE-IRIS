'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   try{
   await queryInterface.bulkInsert('users', [{
     id : 10000000,
     firstname: 'Iris',
     lastname: 'Admin',
     email: 'ieee@ttu.edu',
     password: await bcrypt.hash("zqP$sGf5", 10),
     classification: 'EE',
     alumni: true,
     createdAt: Sequelize.DataTypes.NOW,
     updatedAt: Sequelize.DataTypes.NOW
   }], {});
   await queryInterface.bulkInsert('ieee', [{
     memberId: 101,
     officer: "Admin",
     ferpa: '/public/ferpa/1',
     UserId: 10000000,
     createdAt: new Date.now(),
     updatedAt: Sequelize.DataTypes.NOW
   }], {})
  }catch(err){
    console.log(err);
  }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', {id:10000000}, {});
  }
};
