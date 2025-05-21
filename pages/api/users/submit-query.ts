import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import LectureQuery from '../../../models/LectureQuery';
import User from '../../../models/User';
import { Model } from 'sequelize';

const SECRET = 'placaement-jwt-secret'; // Use env var in production

// Define the User model interface
interface UserAttributes {
  id: number;
  username: string;
  // Add other user attributes as needed
}

// Define the User instance type
interface UserInstance extends Model<UserAttributes>, UserAttributes {}

interface JwtPayload {
  id: number;
  [key: string]: any;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    const user = await User.findByPk(decoded.id) as UserInstance | null;

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { query } = req.body;

    if (!query) return res.status(400).json({ message: 'Query is required' });

    const newQuery = await LectureQuery.create({
      username: user.username,
      query,
    });

    return res.status(201).json({ message: 'Query submitted successfully', data: newQuery });
  } catch (err) {
    console.error('Error submitting query:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}