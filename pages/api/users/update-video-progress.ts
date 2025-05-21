// pages/api/users/update-video-progress.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Videoprogress from '../../../models/Videoprogress';


interface JwtPayload {
  id: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Check for authentication token
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token and extract userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const userId = decoded.id;

    // Get videoId and progress from request body
    const { videoId, progress } = req.body;

    // Validate required fields
    if (videoId === undefined) {
      return res.status(400).json({ success: false, message: 'videoId is required' });
    }

    if (progress === undefined || typeof progress !== 'number' || progress < 0 || progress > 100) {
      return res.status(400).json({ success: false, message: 'Valid progress percentage (0-100) is required' });
    }

    // Convert videoId to number if it's a string
    const videoIdNum = typeof videoId === 'string' ? parseInt(videoId, 10) : videoId;

    // Check if a record already exists
    const existingProgress = await Videoprogress.findOne({
      where: { userId, videoId: videoIdNum }
    });

    if (existingProgress) {
      // Only update if new progress is higher than the existing one
      const currentProgress = existingProgress.get('progress') as number;
      if (progress > currentProgress) {
        existingProgress.set('progress', progress);
        await existingProgress.save();
      }
    } else {
      // Create a new progress record
      await Videoprogress.create({
        userId,
        videoId: videoIdNum,
        progress,
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Video progress updated successfully',
      data: { videoId: videoIdNum, progress }
    });
  } catch (error) {
    console.error('Error updating video progress:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
    
    return res.status(500).json({ success: false, message: 'Server error while updating progress' });
  }
}