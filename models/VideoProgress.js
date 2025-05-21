import {DataTypes} from 'sequelize'; 
import sequelize from '../dbConfig/config.js'   

const Videoprogress = sequelize.define(   
  'Videoprogress',   
  {     
    id: {       
      type: DataTypes.INTEGER,       
      autoIncrement: true,       
      primaryKey: true,     
    },     
    userId: {       
      type: DataTypes.INTEGER,       
      allowNull: false,     
    },     
    videoId: {       
      type: DataTypes.INTEGER,       
      allowNull: false,     
    },     
    progress: {       
      type: DataTypes.FLOAT, // Store progress as a percentage (0-100)       
      allowNull: false,     
    },   
  },   
  {     
    timestamps: true, // Automatically adds createdAt and updatedAt fields   
  }
); 

export default Videoprogress;