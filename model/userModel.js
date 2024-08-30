import { DataTypes } from 'sequelize';
import {sequelize} from '../db/dbConfig.js'; 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'staff', 'student'),
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true, // For soft deletes
});

export default User;
