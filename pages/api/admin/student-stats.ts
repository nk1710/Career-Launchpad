// pages/api/users/admin-created-count.js
import { NextApiRequest,NextApiResponse } from "next";
import User from '../../../models/User'; // adjust the path based on your folder structure
import CourseForm from "../../../models/CourseForm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const count = await User.count({
      where: { role: 'admin_created' },
    });
    const interestedStudents = await CourseForm.count()

    return res.status(200).json({ adminCreatedUserCount: count,interestedStudentsCount:interestedStudents });
  } catch (error) {
    console.error('Error counting admin-created users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
