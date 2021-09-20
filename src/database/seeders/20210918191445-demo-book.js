'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        authorId: 1,
        editorId: 1,
        editionDate: new Date(22,2,2017),
        name: "L'Epouvanteur, tome 1",
        resume: "L'Epouvanteur a eu de nombreux apprentis, me dit maman. Mais peu ont achevé leur formation. Et ceux qui y sont parvenus sont loin d'être à la hauteur. Ils sont fragiles, veules ou lâches. Ils se font payer fort cher de bien maigres services. Il ne reste que toi, mon fils. Tu es notre dernière chance, notre dernier espoir. Il faut que quelqu'un le fasse. Il faut que quelqu'un se dresse contre les forces obscures. Tu es le seul qui en soit capable. ",
        coverLink: "https://images-eu.ssl-images-amazon.com/images/I/614JO2t3npL._SX210_.jpg",
        state: "available",
        borrowedBy: null
      },
      {
        authorId: 2,
        editorId: 2,
        editionDate: new Date(1,1,2007),
        name: "Le Roi en jaune",
        resume: "N/A",
        coverLink: "https://static.fnac-static.com/multimedia/Images/FR/NR/78/77/5d/6125432/1540-1/tsp20200111070322/Le-Roi-en-jaune.jpg",
        state: "available",
        borrowedBy: null
      },
      {
        authorId: 3,
        editorId: 3,
        editionDate: new Date(1,1,2018),
        name: "Les Poulpes, Futurs maîtres du monde ?",
        resume: "N/A",
        coverLink: "https://images.epagine.fr/436/9782330092436_1_75.jpg",
        state: "available",
        borrowedBy: null
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
