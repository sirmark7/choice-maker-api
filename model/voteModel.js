import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConfig.js';

const Vote = sequelize.define('Vote', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
     allowNull:false
  },
  candidateId: {
    type: DataTypes.UUID,
    allowNull:false
  },
}, {
  timestamps: true,
  paranoid: true,
  uniqueKeys: {
    unique_vote: {
      fields: ['userId', 'candidateId'],
    },
  },
});

export default Vote;
