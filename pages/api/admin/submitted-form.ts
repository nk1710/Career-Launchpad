import { NextApiRequest, NextApiResponse } from 'next';
import CourseForm from '../../../models/CourseForm'; // adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const students = await CourseForm.findAll();
    return res.status(200).json({ students });
  } catch (error) {
    console.error('Failed to fetch students:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
