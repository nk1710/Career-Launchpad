import User from '../../../models/User';
import UnlockVideo from '../../../models/UnlockVideo';
import LectureVideo from '../../../models/LectureVideos'; 
import Videoprogress from '../../../models/Videoprogress';
import Course from '../../../models/Courses';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  try {
    const unlocks = await UnlockVideo.findAll();
    const userIds = [...new Set(unlocks.map((u) => u.userId))];
    
    // Get course IDs from unlocks
    // const courseIds = [...new Set(unlocks.map((u) => u.courseId))];
    
    // Updated: use courseId field instead of id field
    const courses = await Course.findAll();
    
    // Create a courseId -> courseName mapping
    const courseMap = courses.reduce((map, course) => {
      map[course.courseId] = course.courseName;
      return map;
    }, {});
    
    const users = await User.findAll({ where: { id: userIds } });
    
    const progressSummary = [];
    
    for (const user of users) {
      const userUnlocks = unlocks.filter((u) => u.userId === user.id);
      
      // Get courses this user is enrolled in
      const userCourseIds = [...new Set(userUnlocks.map(u => u.courseId))];
      const userCourses = userCourseIds.map(id => courseMap[id] || 'Unknown Course');
      
      const userData = {
        username: user.username,
        courses: userCourses,
        progress: [],
      };
      
      for (const unlock of userUnlocks) {
        const { courseId, month } = unlock;
        
        const videos = await LectureVideo.findAll({ where: { courseId, month } });
        const total = videos.length;
        
        let watched = 0;
        for (const video of videos) {
          const progress = await Videoprogress.findOne({
            where: { userId: user.id, videoId: video.id }
          });
          
          if (progress && progress.progress >= 90) watched++;
        }
        
        const status =
          watched === 0
            ? '0% completed'
            : watched === total
            ? '✅ Completed'
            : `${Math.round((watched / total) * 100)}% completed`;
        
        userData.progress.push({ 
          courseId, 
          courseName: courseMap[courseId] || 'Unknown Course', 
          month, 
          watched, 
          total, 
          status 
        });
      }
      
      progressSummary.push(userData);
    }
    
    return res.status(200).json(progressSummary);
  } catch (error) {
    console.error('🔥 API ERROR in user-progress-summary:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}