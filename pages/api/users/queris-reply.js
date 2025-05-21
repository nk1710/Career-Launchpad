import jwt from 'jsonwebtoken';
import LectureQuery from '../../../models/LectureQuery';
import User from '../../../models/User';

const SECRET = 'placaement-jwt-secret'; // Use env var in production

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const queries = await LectureQuery.findAll({
      where: { username: user.username },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ data: queries });
  } catch (err) {
    console.error('Error fetching user queries:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
