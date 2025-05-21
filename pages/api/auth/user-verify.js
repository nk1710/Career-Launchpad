import jwt from 'jsonwebtoken'
import User from '../../../models/User'

const SECRET = process.env.JWT_SECRET // move to env in production

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token)
    return res.status(401).json({ valid: false, message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, SECRET)
    const user = await User.findByPk(decoded.id)

    if (!user) {
      return res.status(404).json({ valid: false, message: 'User not found' })
    }

    return res
      .status(200)
      .json({ valid: true, user: { id: user.id, username: user.username } })
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Invalid token' })
  }
}
