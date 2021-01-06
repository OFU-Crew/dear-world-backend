'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const transaction = await queryInterface.sequelize.transaction();

    // try {
    //   await queryInterface.createTable('like_histories', {
    //     id: {
    //       allowNull: false,
    //       autoIncrement: true,
    //       primaryKey: true,
    //       type: Sequelize.INTEGER.UNSIGNED,
    //     },
    //     ipv4: {
    //       allowNull: false,
    //       type: Sequelize.DataTypes.STRING(20),
    //     },
    //     createdAt: {
    //       allowNull: false,
    //       type: Sequelize.DATE,
    //     },
    //     updatedAt: {
    //       allowNull: false,
    //       type: Sequelize.DATE,
    //     },
    //   }, {transaction});

    //   await queryInterface.addIndex('like_histories', [
    //     'ipv4',
    //   ], {transaction});
    // } catch (error) {
    //   await transaction.rollback();
    //   throw error;
    // }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('like_histories');
  },
};
