import { DataTypes } from 'sequelize'
import sequelize from '../dbConfig/config.js'

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone: {
        type: DataTypes.STRING(20), // Optional for admin-created users
        allowNull: true,
      },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    enrollmentNo: {
      type: DataTypes.STRING(6),
      allowNull: true, // allow null values
      unique: true,
    },
    
    role: {
      type: DataTypes.ENUM('registered', 'admin_created'),
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
)

export default User
