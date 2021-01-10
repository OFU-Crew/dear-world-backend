'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'countries',
        'image_url',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'countries',
        'image_url',
    );
  },
};
