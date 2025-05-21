// models/UnlockVideo.ts

import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/config.js';

const UnlockVideo = sequelize.define('UnlockVideo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'UnlockVideos',
  timestamps: false,
});

export default UnlockVideo;
