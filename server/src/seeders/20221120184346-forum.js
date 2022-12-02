'use strict';

/** @type {import('sequelize-cli').Migration} */
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

     await queryInterface.bulkInsert('forums', [
        {
          id: 1, 
          title: '공지사항',
          depth: 1,
          parent: 1
        },
        {
          id: 2, 
          title: 'Q&A',
          depth: 1,
          parent: 1
        },
        {
          id: 3, 
          title: '자유게시판',
          depth: 1,
          parent: 1
        },
        {
          id: 4, 
          title: '클럽활동',
          depth: 1,
          parent: 1
        },
        {
          id: 5, 
          title: '레어글',
          depth: 1,
          parent: 1
        },
        {
          id: 6, 
          title: '슈퍼레어글',
          depth: 1,
          parent: 1
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('forums', null, {});
  }
};
