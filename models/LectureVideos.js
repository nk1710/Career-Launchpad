// models/LectureVideo.ts

import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/config.js';
const LectureVideo = sequelize.define('LectureVideo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.STRING, // ✅ MUST BE STRING!
    allowNull: false,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'LectureVideos',
  timestamps: false,
});

export default LectureVideo;
