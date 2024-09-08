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




export default Election;
