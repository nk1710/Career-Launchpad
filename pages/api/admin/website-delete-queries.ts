import { NextApiRequest, NextApiResponse } from 'next'
import userQueries from '../../../models/User_Queries' // adjust path as needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ message: 'Query ID is required' })
  }

  try {
    const deletedCount = await userQueries.destroy({ where: { id } })

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Query not found' })
    }

    return res.status(200).json({ message: 'Query deleted successfully' })
  } catch (error) {
    console.error('Error deleting query:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
