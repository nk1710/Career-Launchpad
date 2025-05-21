// pages/api/lecture-videos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Course from '../../../models/Courses';
import LectureVideo from '../../../models/LectureVideos.js';
// Removed unused 'Model' import from sequelize

// Interface for the organized result
interface OrganizedResult {
  [courseId: string]: {
    courseName: string;
    months: {
      [month: number]: any[];
    };
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch all lecture videos using the correct type
    const lectureVideos = await LectureVideo.findAll();
    
    // Fetch all course names (for mapping)
    const courses = await Course.findAll();

    // Create a map of courseId to courseName
    const courseMap: Record<string, string> = {};
    
    courses.forEach((course: any) => {
      const courseId = course.get('courseId') as string;
      const courseName = course.get('courseName') as string;
      courseMap[courseId] = courseName;
    });

    // Organize lecture videos grouped by courseId and then by month
    const result: OrganizedResult = {};

    lectureVideos.forEach((video: any) => {
      const courseId = video.get('courseId') as string;
      const month = video.get('month') as number;

      if (!result[courseId]) {
        result[courseId] = {
          courseName: courseMap[courseId] || courseId,
          months: {},
        };
      }

      if (!result[courseId].months[month]) {
        result[courseId].months[month] = [];
      }

      result[courseId].months[month].push(video);
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching lecture videos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}