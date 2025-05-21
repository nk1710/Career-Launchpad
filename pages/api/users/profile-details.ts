import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import authenticateToken from '../users/authenticateToken'

// Define the expected shape of the user object (optional but helpful)
interface SafeUser {
  id: number | string
  username: string
  email: string
  role: string
  [key: string]: any // to allow additional fields (excluding password)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  try {
    const userId = authenticateToken(req)

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const dbUser = await User.findOne({
      where: {
        id: userId,
        role: 'admin_created',
      },
      attributes: { exclude: ['password'] },
    })

    if (!dbUser) {
      res.status(404).json({ message: 'User not found or not admin-created' })
      return
    }

    // If using custom user interface, cast it (optional)
    const user: SafeUser = dbUser.toJSON()

    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
