import { DataTypes } from 'sequelize';
import {sequelize} from '../db/dbConfig.js'; 

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
     allowNull:false
  },
  positionId: {
    type: DataTypes.UUID,
    allowNull:false
  },
}, {
  timestamps: true,
  paranoid: true,
});



export default Candidate;
