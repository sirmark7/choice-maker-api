'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ElectionPosition', {
      electionId: {
        type: Sequelize.UUID,
        references: {
          model: 'Elections',
          key: 'id',
        },
        allowNull: false,
      },
      positionId: {
        type: Sequelize.UUID,
        references: {
          model: 'Positions',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ElectionPosition');
  }
};
