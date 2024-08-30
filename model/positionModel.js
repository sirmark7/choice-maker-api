import { DataTypes } from 'sequelize';
import {sequelize} from '../db/dbConfig.js'; 
import Category from './categoryModel.js';

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
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  paranoid: true,
});

Position.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export default Position;
