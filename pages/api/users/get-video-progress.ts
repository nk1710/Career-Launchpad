import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import Videoprogress from '../../../models/Videoprogress';

// Extend the default JwtPayload to include your custom payload structure
interface CustomJwtPayload extends DefaultJwtPayload {
  id: number;
}

interface ProgressMap {
  [key: string]: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as CustomJwtPayload;

    const userId = decoded.id;

    const { videoId } = req.query;

    if (!videoId) {
      // Fetch all video progress for this user
      const allProgress = await Videoprogress.findAll({
        where: { userId }
      });

      const progressMap: ProgressMap = allProgress.reduce(
        (acc: ProgressMap, item: any) => {
          acc[item.get('videoId')] = item.get('progress');
          return acc;
        },
        {}
      );

      res.status(200).json({ success: true, data: progressMap });
    } else {
      // Fetch specific video progress
      const progress = await Videoprogress.findOne({
        where: { userId, videoId: Number(videoId) }
      });

      res.status(200).json({
        success: true,
        data: progress ? progress.get('progress') : 0
      });
    }
  } catch (error) {
    console.error('Error fetching video progress:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}