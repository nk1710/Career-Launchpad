import { NextApiRequest } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'

// Define your custom JWT payload interface
interface CustomJwtPayload extends JwtPayload {
  userId?: string
  id?: string
}

export default function authenticateToken(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    console.warn('No token provided in Authorization header.')
    return null
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET is not defined in environment variables.')
    return null
  }

  try {
    const decoded = jwt.verify(token, secret) as CustomJwtPayload
    return decoded.userId || decoded.id || null
  } catch (err) {
    console.error('JWT verification failed:', err)
    return null
  }
}
