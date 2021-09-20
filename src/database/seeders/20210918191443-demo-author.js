'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authors', [
      {
        firstName: 'Joseph',
        lastName: 'Delaney'
      },
      {
        firstName: 'Robert',
        lastName: 'W. Chambers'
      },
      {
        firstName: 'Claire',
        lastName: 'Lecoeuvre'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => { }
};
