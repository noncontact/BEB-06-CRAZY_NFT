'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      nickname: 'admin',
      password: '1234',
      address: '12',
      profileurl: 'https://image.bugsm.co.kr/album/images/500/3141/314174.jpg',
      createdAt: new Date,
      updatedAt: new Date
    }, {}]); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
