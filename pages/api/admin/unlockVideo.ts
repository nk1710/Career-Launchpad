// pages/api/admin/unlockVideo.ts
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import UnlockVideo from '../../../models/UnlockVideo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, courseId, month } = req.body;

  if (!username || !courseId || month === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await User.findOne({ where: { username } }) as any;

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if already unlocked
    const exists = await UnlockVideo.findOne({
      where: {
        userId: user.id,
        courseId,
        month,
      },
    });

    if (exists) {
      return res.status(409).json({ message: 'Already unlocked for this user' });
    }

    await UnlockVideo.create({
      userId: user.id,
      courseId,
      month,
    });

    return res.status(200).json({ message: 'Video unlocked successfully' });
  } catch (error) {
    console.error('Unlock error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
