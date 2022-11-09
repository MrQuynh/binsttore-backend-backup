"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      brain: {
        type: Sequelize.STRING,
      },
      priceUp: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      priceDown: {
        type: Sequelize.STRING,
      },
      group: {
        type: Sequelize.STRING,
      },
      sale: {
        type: Sequelize.STRING,
      },
      ram: {
        type: Sequelize.STRING,
      },
      rom: {
        type: Sequelize.STRING,
      },
      screen: {
        type: Sequelize.STRING,
      },
      card: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
