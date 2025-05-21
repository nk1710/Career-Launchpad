import { NextApiRequest, NextApiResponse } from 'next';
import Course from '../../../models/Courses'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      
      const courses = await Course.findAll({
        attributes: ['courseId', 'courseName', 'duration'],
      });
      return res.status(200).json(courses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
