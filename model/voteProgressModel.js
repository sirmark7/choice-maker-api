import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConfig.js';

const VoterProgress = sequelize.define('VoterProgress', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  electionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  positionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  candidateId: {
    type: DataTypes.UUID,
    allowNull: true,  // Can be null if the voter hasn't chosen a candidate yet
  },
  progressStatus: {
    type: DataTypes.ENUM('in_progress', 'completed'),
    allowNull: false,
    defaultValue: 'in_progress'
  },
}, {
  timestamps: true,
  paranoid: true,
});

export default VoterProgress;
