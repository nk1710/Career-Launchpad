import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User.js';
import bcrypt from 'bcryptjs';

// Utility to generate a 6-digit unique enrollment number
async function generateEnrollmentNo() {
  let enrollmentNo;
  let exists = true;

  while (exists) {
    enrollmentNo = Math.floor(100000 + Math.random() * 900000).toString();
    const existingUser = await User.findOne({ where: { enrollmentNo } });
    if (!existingUser) exists = false;
  }

  return enrollmentNo;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, phone, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const enrollmentNo = await generateEnrollmentNo();

    const user = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      enrollmentNo,
      role: 'admin_created',
    });

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
}
