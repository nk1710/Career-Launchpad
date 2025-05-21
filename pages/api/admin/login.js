import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../../models/User.js' // ✅ Corrected import


// Hardcoded admin credentials (For testing purposes only)
const ADMIN_EMAIL = 'admin@12.com'
const ADMIN_PASSWORD = '123' // In production, use a strong hashed password

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password } = req.body

  try {
    // **1. Hardcoded Admin Check**
    if (email === ADMIN_EMAIL) {
      if (password === ADMIN_PASSWORD) {
        // Create a JWT token for hardcoded admin
        const token = jwt.sign(
          { id: 'admin', role: 'admin' },
          process.env.JWT_SECRET,
          { expiresIn: '8h' }
        )

        return res.status(200).json({
          success: true,
          token,
          user: {
            id: 'admin',
            username: 'Admin',
            role: 'admin',
          },
        })
      } else {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
    }

    // **2. Check if user exists in the database**
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // **3. Validate password**
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' })
    }

    // **4. Generate JWT token**
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}
