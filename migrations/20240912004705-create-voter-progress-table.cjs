'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('VoterProgress', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // Assuming you have a Users table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      electionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Elections', // Assuming you have an Elections table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      positionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Positions', // Assuming you have a Positions table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      candidateId: {
        type: Sequelize.UUID,
        allowNull: true,  // Can be null if voter hasn't selected a candidate yet
        references: {
          model: 'Candidates', // Assuming you have a Candidates table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      progressStatus: {
        type: Sequelize.ENUM('in_progress', 'completed'),
        allowNull: false,
        defaultValue: 'in_progress'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('VoterProgress');
  }
};
