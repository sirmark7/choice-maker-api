import { DataTypes } from 'sequelize';
import {sequelize} from '../db/dbConfig.js'; 
const Position = sequelize.define('Position', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull:false
  },
}, {
  timestamps: true,
  paranoid: true,
});


export default Position;
