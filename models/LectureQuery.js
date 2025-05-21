// models/LectureQuery.js
import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/config.js';

const LectureQuery = sequelize.define('LectureQuery', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  query: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  reply: {
    type: DataTypes.TEXT,
    allowNull: true, // reply can be null initially
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

export default LectureQuery;
