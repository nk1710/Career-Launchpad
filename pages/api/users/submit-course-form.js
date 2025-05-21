import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import CourseForm from '../../../models/courseForm.js'
import sequelize from '../../../dbConfig/config.js'
import cloudinary from '../../../dbConfig/cloudinary.js'

// === Cloudinary Storage Configuration ===
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'course-forms',
    resource_type: 'auto',
    public_id: file.fieldname + '-' + Date.now(),
  }),
})

// === Multer Config ===
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/
    const extname = allowedTypes.test(file.originalname.toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    if (extname && mimetype) cb(null, true)
    else cb(new Error('Only .jpeg, .jpg, .png, and .pdf files are allowed'))
  },
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'tenthDocument', maxCount: 1 },
  { name: 'twelfthDocument', maxCount: 1 },
])

// === Middleware Wrapper ===
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result)
      return resolve(result)
    })
  })

// === Disable bodyParser ===
export const config = {
  api: {
    bodyParser: false,
  },
}

// // === Helper: Generate Unique 6-digit Enrollment No ===
// const generateEnrollmentNo = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString()
// }

// const getUniqueEnrollmentNo = async () => {
//   let unique = false
//   let enrollmentNo
//   while (!unique) {
//     enrollmentNo = generateEnrollmentNo()
//     const exists = await CourseForm.findOne({ where: { enrollmentNo } })
//     if (!exists) unique = true
//   }
//   return enrollmentNo
// }

// === Main API Handler ===
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }

  try {
    await runMiddleware(req, res, upload)

    const {
      name,
      fatherName,
      number,
      email,
      dob,
      gender,
      aadharNo,
      course,
      duration,
      address,
      country,
      state,
      city,
      pincode,
      qualification,
      price,
    } = req.body

    const requiredFields = [
      'name',
      'fatherName',
      'number',
      'email',
      'dob',
      'gender',
      'aadharNo',
      'course',
      'duration',
      'address',
      'country',
      'state',
      'city',
      'pincode',
      'qualification',
      'price',
    ]
    const missing = requiredFields.filter((field) => !req.body[field])
    if (missing.length > 0) {
      return res
        .status(400)
        .json({ error: `Missing fields: ${missing.join(', ')}` })
    }

    const formattedDob = new Date(dob).toISOString().split('T')[0]

    const tenthDocument = req.files?.tenthDocument?.[0]?.path || null
    const twelfthDocument = req.files?.twelfthDocument?.[0]?.path || null
    const image = req.files?.image?.[0]?.path || null

    await sequelize.authenticate()
    // console.log('DB connected')

    // const enrollmentNo = await getUniqueEnrollmentNo()

    const newForm = await CourseForm.create({
      // enrollmentNo,
      name,
      fatherName,
      number,
      email,
      dob: formattedDob,
      gender,
      aadharNo,
      course,
      duration,
      address,
      country,
      state,
      city,
      pincode,
      qualification,
      price: parseFloat(price),
      tenthDocument,
      twelfthDocument,
      image,
    })

    res.status(201).json({ success: true, data: newForm })
  } catch (error) {
    // console.error('Submission error:', error)
    res.status(500).json({ error: error.message || 'Something went wrong' })
  }
}
