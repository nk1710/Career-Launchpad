import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const users = await User.findAll({
        where: { role: 'registered' },
        attributes: ['id', 'username', 'email', 'phone', 'role', 'createdAt'], // Optional: choose fields to return
      });
      
  
      return res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching admin-created users:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  