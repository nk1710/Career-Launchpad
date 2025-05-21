import LectureQuery from '../../../models/LectureQuery';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

const SECRET = 'placaement-jwt-secret';

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or malformed token', error: err.message });
  }

  try {
    const user = await User.findByPk(decoded.id);

    if (!user || user.role !== 'admin_created') {
      return res.status(403).json({ message: 'Forbidden: Not an admin_created user' });
    }

    if (req.method === 'GET') {
      const queries = await LectureQuery.findAll({ order: [['createdAt', 'DESC']] });
      return res.status(200).json(queries);
    }

    if (req.method === 'POST') {
      const { id, reply } = req.body;
      if (!id || !reply) return res.status(400).json({ message: 'Missing fields' });

      const query = await LectureQuery.findByPk(id);
      if (!query) return res.status(404).json({ message: 'Query not found' });

      query.reply = reply;
      await query.save();

      return res.status(200).json({ message: 'Reply saved successfully', data: query });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (err) {
    console.error('Error handling queries:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
