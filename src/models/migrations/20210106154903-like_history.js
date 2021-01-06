'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'like_histories',
        'like',
        {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'like_histories',
        'like',
    );
  },
};
