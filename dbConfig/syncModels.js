import sequelize from './config.js';
import User from '../models/User.js';
import CourseDetails from '../models/courseDetails.js';
import CourseForm from '../models/courseForm.js';
import UserQuery from '../models/user_queries.js';


const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sync models (create/update tables)
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase();
