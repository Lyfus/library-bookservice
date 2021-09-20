'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Authors"
          },
          key: 'id',
          onDelete: 'cascade'
        },
        allowNull: false
      },
      editorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Editors"
          },
          key: 'id',
          onDelete: 'cascade'
        },
        allowNull: false
      },
      editionDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      resume: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      coverLink: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.ENUM("available", "borrowed", "atHome", "fixing"),
        allowNull: false,
        defaultValue: "available"
      },
      borrowedBy: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Books');
  }
};