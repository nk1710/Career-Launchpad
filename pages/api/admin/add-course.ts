import { NextApiRequest, NextApiResponse } from 'next';
import LectureVideo from '../../../models/LectureVideos.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const {courseId, title, url, month} = req.body;

    if(!courseId || !title || !url || !month) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const newLecture = await LectureVideo.create({
            courseId,
            title,
            url,
            month
        });
        return res.status(201).json({ message: 'Lecture video added successfully', lecture: newLecture });
    } catch (error) {
        console.error('Error creating lecture video:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }