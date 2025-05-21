import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User.js';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, username, password } = req.body;

//   if (!id || !username || !password) {
//     return res.status(400).json({ message: 'ID, username, and password are required' });
//   }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({ username, password: hashedPassword });

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
