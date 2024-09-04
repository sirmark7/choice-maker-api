import { DataTypes } from 'sequelize';
import {sequelize} from '../db/dbConfig.js'; 

const Election = sequelize.define('Election', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'closed'),
    allowNull: false,
    defaultValue: 'upcoming',
  },
}, {
  timestamps: true,
  paranoid: true,
});

import Position from './positionModel.js';

// Define the many-to-many relationship using a join table
Election.belongsToMany(Position, { through: 'ElectionPosition', as: 'positions' });
Position.belongsToMany(Election, { through: 'ElectionPosition', as: 'elections' });

export default Election;
