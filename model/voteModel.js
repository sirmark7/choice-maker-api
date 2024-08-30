import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConfig.js';
import User from './userModel.js';
import Candidate from './candidateModel.js';

const Vote = sequelize.define('Vote', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
  },
  candidateId: {
    type: DataTypes.UUID,
    references: {
      model: Candidate,
      key: 'id',
    },
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

Vote.belongsTo(User, { foreignKey: 'userId', as: 'student' });
Vote.belongsTo(Candidate, { foreignKey: 'candidateId', as: 'candidate' });

export default Vote;
