'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Editors', [
      {
        name: 'Bayard jeunesse'
      },
      {
        name: 'Malpertuis'
      },
      {
        name: 'Actes Sud junior'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => { }
};
