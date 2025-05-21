import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/config.js';

const UserQuery = sequelize.define(
  "user_queries",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default UserQuery;
