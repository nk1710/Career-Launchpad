// pages/api/users/register.js

import User from '../../../models/User'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, email, password, phone } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      role: 'registered'
    })

    return res.status(201).json({ message: 'Registered successfully' })
  } catch (err) {
    console.error('Registration error:', err)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}