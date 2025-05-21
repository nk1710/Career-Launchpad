import UserQuery from '../../../models/user_queries.js'; 
import sequelize from '../../../dbConfig/config.js'


export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { fullName, contactNumber, emailId, query } = req.body;
  
    if (!fullName || !contactNumber || !emailId || !query) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Sync DB if not already
      await sequelize.sync();
  
      // Save the query to the database
      const newQuery = await UserQuery.create({
        fullName,
        contactNo: contactNumber, // Note: Model uses contactNo
        emailId,
        query,
      });
  
      res.status(201).json({ message: 'Query saved successfully', data: newQuery });
    } catch (error) {
      console.error('Error saving query:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }