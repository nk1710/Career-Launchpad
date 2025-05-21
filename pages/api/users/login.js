
//active this code to see admin created login


// import User from '../../../models/User'
// // import bcrypt from 'bcryptjs' // Commented out for now
// import jwt from 'jsonwebtoken'

// const SECRET = 'placaement-jwt-secret' // Use .env in production

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end()

//   const { username, password } = req.body

//   try {
//     const user = await User.findOne({ where: { username } })
//     if (!user) return res.status(400).json({ message: 'User not found' })

//     // Plain text password check for testing only:
//     // const isMatch = await bcrypt.compare(password, user.password)
//     // if (!isMatch)
//     if (password !== user.password) {
//       return res.status(400).json({ message: 'Invalid credentials' })
//     }

//     const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
//       expiresIn: '7d',
//     })

//     return res.status(200).json({
//       message: 'Login successful',
//       token,
//       role: user.role,
//     })
//   } catch (err) {
//     console.error(err)
//     return res.status(500).json({ message: 'Error during login' })
//   }
// }

// to see user login active this code 
import User from '../../../models/User'
import bcrypt from 'bcryptjs' // ✅ Enable bcrypt for password comparison
import jwt from 'jsonwebtoken'

const SECRET = 'placaement-jwt-secret' // 🔐 Use process.env.SECRET in production

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body

  try {
    const user = await User.findOne({ where: { username } })
    if (!user) return res.status(400).json({ message: 'User not found' })

    // ✅ Compare hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
      expiresIn: '7d',
    })

    return res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error during login' })
  }
}

