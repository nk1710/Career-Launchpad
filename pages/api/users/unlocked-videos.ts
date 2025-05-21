import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import LectureVideo from '../../../models/LectureVideos';
import UnlockVideo from '../../../models/UnlockVideo';
import Course from '../../../models/Courses'; // ✅ Add this
import User from '../../../models/User';
import { Model } from 'sequelize';

// Define interfaces for your models
interface UserAttributes {
  id: number;
  // Add other user attributes as needed
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

interface UnlockVideoAttributes {
  id: number;
  userId: number;
  courseId: string;
  month: number;
  // Add other unlock video attributes as needed
}

interface UnlockVideoInstance extends Model<UnlockVideoAttributes>, UnlockVideoAttributes {}
interface LectureVideoAttributes {
  id: number;
  courseId: string;
  month: number;
  // Add other lecture video attributes as needed
}

interface LectureVideoInstance extends Model<LectureVideoAttributes>, LectureVideoAttributes {}
interface CourseAttributes {
  id: number;
  courseId: string;
  courseName: string;
  duration: string;
}

interface CourseInstance extends Model<CourseAttributes>, CourseAttributes {}

// Define JWT payload interface
interface JwtPayload {
  id: number;
  [key: string]: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const userId = decoded.id;

    // Fetch the user by the decoded userId
    const user = await User.findByPk(userId) as UserInstance | null;
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch all unlock records for the user
    const unlocks = await UnlockVideo.findAll({ 
      where: { userId: user.id } 
    }) as UnlockVideoInstance[];

    // To store the unlocked videos
    const unlockedVideos: Record<string, { courseName: string; month: number; videos: LectureVideoInstance[] }[]> = {};


    // To prevent duplicate months from being added
    const unlockedMap = new Set<string>();

    // Iterate over each unlock record
    for (const unlock of unlocks) {
      const key = `${unlock.courseId}-${unlock.month}`;
      if (unlockedMap.has(key)) continue;
      unlockedMap.add(key);
    
      const videos = await LectureVideo.findAll({
        where: {
          courseId: unlock.courseId,
          month: unlock.month,
        },
      }) as LectureVideoInstance[];
    
      if (!unlockedVideos[unlock.courseId]) {
        unlockedVideos[unlock.courseId] = [];
      }
    
      const course = await Course.findOne({ where: { courseId: unlock.courseId } }) as CourseInstance | null;

    
      unlockedVideos[unlock.courseId].push({
        courseName: course?.courseName || 'Unknown Course',
        month: unlock.month,
        videos,
      });
    }
    

    // Respond with the unlocked videos grouped by courseId and month
    return res.status(200).json(unlockedVideos);
  } catch (error) {
    console.error('Error fetching unlocked videos:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}