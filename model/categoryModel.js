import { DataTypes } from 'sequelize';
import {sequelize} from '../db/dbConfig.js'; 

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

export default Category;
