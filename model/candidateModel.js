import { DataTypes } from 'sequelize';
import {sequelize} from '../db/dbConfig.js'; 
import User from './userModel.js';
import Position from './positionModel.js';

const Candidate = sequelize.define('Candidate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  manifesto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  policies: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
  },
  positionId: {
    type: DataTypes.UUID,
    references: {
      model: Position,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  paranoid: true,
});

Candidate.belongsTo(User, { foreignKey: 'userId', as: 'student' });
Candidate.belongsTo(Position, { foreignKey: 'positionId', as: 'position' });

export default Candidate;
