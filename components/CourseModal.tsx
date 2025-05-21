import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router';

import { X } from 'lucide-react'

// Define the form field types to match database model exactly
interface FormData {
  personalInfo: {
    name: string
    fatherName: string
    number: string // Changed from "phone" to "number" to match database
    email: string
    dob: string
    aadharNo: string // Changed from "adharNo" to "aadharNo" to match database
    gender: string
  }
  address: {
    address: string
    country: string
    state: string
    city: string
    pincode: string // Changed from "pinCode" to "pincode" to match database
  }
  education: {
    qualification: string
  }
  courseDetails: {
    selectedCourse: string
    duration: string
    price: string
    courseList?: string[]
  }
  documents: {
    image: File | null // Changed from "photo" to "image" to match database
    tenthDocument: File | null
    twelfthDocument: File | null
  }
  termsAgreed: boolean
}

interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  courseTitle: string
  duration: string
  price: string
  courseList?: string[]
}

const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
  duration,
  price,
  courseList = [courseTitle],
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      name: '',
      fatherName: '',
      number: '', // Changed from "phone" to "number"
      email: '',
      dob: '',
      aadharNo: '', // Changed from "adharNo" to "aadharNo"
      gender: 'Male', // Default gender with capital first letter to match ENUM
    },
    address: {
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '', // Changed from "pinCode" to "pincode"
    },
    education: {
      qualification: '',
    },
    courseDetails: {
      selectedCourse: courseTitle,
      duration: duration,
      price: price,
      courseList: courseList || [courseTitle],
    },
    documents: {
      image: null, // Changed from "photo" to "image"
      tenthDocument: null,
      twelfthDocument: null,
    },
    termsAgreed: false,
  })

  // Add form validation state and errors
  const [errors, setErrors] = useState({
    personalInfo: {
      name: '',
      fatherName: '',
      number: '',
      email: '',
      dob: '',
      aadharNo: '',
      gender: '',
    },
    address: {
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
    },
    education: {
      qualification: '',
    },
    documents: {
      image: '',
      tenthDocument: '',
      twelfthDocument: '',
    },
  })

  // Validation status for each step
  // const [stepValidity, setStepValidity] = useState({
  //   1: false, // Personal Info
  //   2: false, // Address
  //   3: false, // Education
  //   4: false, // Documents
  //   5: false, // Review
  // })

  // Handle input changes for text fields - Fixed type issue with specific handling per section
  const handleInputChange = (
    section: keyof FormData,
    field: string,
    value: string | boolean
  ) => {
    if (section === 'personalInfo') {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          [field]: value,
        },
      })
    } else if (section === 'address') {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: value,
        },
      })
    } else if (section === 'education') {
      setFormData({
        ...formData,
        education: {
          ...formData.education,
          [field]: value,
        },
      })
    } else if (section === 'courseDetails') {
      setFormData({
        ...formData,
        courseDetails: {
          ...formData.courseDetails,
          [field]: value,
        },
      })
    } else if (section === 'termsAgreed' && typeof value === 'boolean') {
      setFormData({
        ...formData,
        termsAgreed: value,
      })
    }
  }

  // Handle file uploads
  const handleFileChange = (field: string, files: FileList | null) => {
    if (!files) return

    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [field]: files[0],
      },
    })

    // Clear any error for this field
    setErrors({
      ...errors,
      documents: {
        ...errors.documents,
        [field]: '',
      }
    })
  }

  // Validate personal information
  const validatePersonalInfo = useCallback(() => {
    const newErrors = { ...errors }
    let isValid = true

    if (!formData.personalInfo.name.trim()) {
      newErrors.personalInfo.name = ''
      isValid = false
    } else if (formData.personalInfo.name.length < 3) {
      newErrors.personalInfo.name = 'Name must be at least 3 characters'
      isValid = false
    } else {
      newErrors.personalInfo.name = ''
    }
  
    // Father's name validation
    if (!formData.personalInfo.fatherName.trim()) {
      newErrors.personalInfo.fatherName = ''
      isValid = false
    } else {
      newErrors.personalInfo.fatherName = ''
    }
  
    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/
    if (!formData.personalInfo.number.trim()) {
      newErrors.personalInfo.number = ''
      isValid = false
    } else if (!phoneRegex.test(formData.personalInfo.number)) {
      newErrors.personalInfo.number = 'Please enter a valid 10-digit phone number'
      isValid = false
    } else {
      newErrors.personalInfo.number = ''
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.personalInfo.email.trim()) {
      newErrors.personalInfo.email = ''
      isValid = false
    } else if (!emailRegex.test(formData.personalInfo.email)) {
      newErrors.personalInfo.email = 'Please enter a valid email address'
      isValid = false
    } else {
      newErrors.personalInfo.email = ''
    }
  
    // Date of birth validation
    if (!formData.personalInfo.dob) {
      newErrors.personalInfo.dob = ''
      isValid = false
    } else {
      // Check if the person is at least 6 years old
      const dobDate = new Date(formData.personalInfo.dob)
      const today = new Date()
      const sixYearsAgo = new Date(today.getFullYear() - 6, today.getMonth(), today.getDate())
      
      if (dobDate > sixYearsAgo) {
        newErrors.personalInfo.dob = 'You must be at least 6 years old'
        isValid = false
      } else {
        newErrors.personalInfo.dob = ''
      }
    }
  
    // Aadhar validation
    const aadharRegex = /^[0-9]{12}$/
    if (!formData.personalInfo.aadharNo.trim()) {
      newErrors.personalInfo.aadharNo = ''
      isValid = false
    } else if (!aadharRegex.test(formData.personalInfo.aadharNo)) {
      newErrors.personalInfo.aadharNo = 'Please enter a valid 12-digit Aadhar number'
      isValid = false
    } else {
      newErrors.personalInfo.aadharNo = ''
    }
  
    setErrors({...errors, personalInfo: newErrors.personalInfo})
    return isValid
  }, [formData.personalInfo, errors])
  
  const validateAddress = useCallback(() => {
    const newErrors = { ...errors }
    let isValid = true
  
    // Address validation
    if (!formData.address.address.trim()) {
      newErrors.address.address = ''
      isValid = false
    } else if (formData.address.address.length < 3) {
      newErrors.address.address = 'Please enter a complete address'
      isValid = false
    } else {
      newErrors.address.address = ''
    }
  
    // Country validation
    if (!formData.address.country.trim()) {
      newErrors.address.country = ''
      isValid = false
    } else {
      newErrors.address.country = ''
    }
  
    // State validation
    if (!formData.address.state.trim()) {
      newErrors.address.state = ''
      isValid = false
    } else {
      newErrors.address.state = ''
    }
  
    // City validation
    if (!formData.address.city.trim()) {
      newErrors.address.city = ''
      isValid = false
    } else {
      newErrors.address.city = ''
    }
  
    // PIN code validation
    const pincodeRegex = /^[0-9]{6}$/
    if (!formData.address.pincode.trim()) {
      newErrors.address.pincode = ''
      isValid = false
    } else if (!pincodeRegex.test(formData.address.pincode)) {
      newErrors.address.pincode = 'Please enter a valid 6-digit PIN code'
      isValid = false
    } else {
      newErrors.address.pincode = ''
    }
  
    setErrors({...errors, address: newErrors.address})
    return isValid
  }, [formData.address, errors])
  
  const validateEducation = useCallback(() => {
    const newErrors = { ...errors }
    let isValid = true
  
    // Qualification validation
    if (!formData.education.qualification) {
      newErrors.education.qualification = ''
      isValid = false
    } else {
      newErrors.education.qualification = ''
    }
  
    setErrors({...errors, education: newErrors.education})
    return isValid
  }, [formData.education, errors])
  
  const validateDocuments = useCallback(() => {
    const newErrors = { ...errors }
    let isValid = true
  
    // Image validation
    if (!formData.documents.image) {
      newErrors.documents.image = ''
      isValid = false
    } else if (formData.documents.image.size > 1 * 1024 * 1024) { // 1MB
      newErrors.documents.image = 'Image size should not exceed 1MB'
      isValid = false
    } else {
      newErrors.documents.image = ''
    }
  
    // 10th document validation
    if (!formData.documents.tenthDocument) {
      newErrors.documents.tenthDocument = ''
      isValid = false
    } else if (formData.documents.tenthDocument.size > 2 * 1024 * 1024) { // 2MB
      newErrors.documents.tenthDocument = 'Document size should not exceed 2MB'
      isValid = false
    } else {
      newErrors.documents.tenthDocument = ''
    }
  
    // 12th document validation
    if (!formData.documents.twelfthDocument) {
      newErrors.documents.twelfthDocument = ''
      isValid = false
    } else if (formData.documents.twelfthDocument.size > 2 * 1024 * 1024) { // 2MB
      newErrors.documents.twelfthDocument = 'Document size should not exceed 2MB'
      isValid = false
    } else {
      newErrors.documents.twelfthDocument = ''
    }
  
    setErrors({...errors, documents: newErrors.documents})
    return isValid
  }, [formData.documents, errors])
  
  const validateReview = useCallback(() => {
    return formData.termsAgreed
  }, [formData.termsAgreed])
  

  // Validate the current step
  const validateCurrentStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return validatePersonalInfo()
      case 2:
        return validateAddress()
      case 3:
        return validateEducation()
      case 4:
        return validateDocuments()
      case 5:
        return validateReview()
      default:
        return false
    }
  }, [currentStep, validatePersonalInfo, validateAddress, validateEducation, validateDocuments, validateReview])
  
  // Update validation status whenever form data changes
  // useEffect(() => {
  //   const isValid = validateCurrentStep()
  //   setStepValidity(prevState => ({
  //     ...prevState,
  //     [currentStep]: isValid
  //   }))
  // }, [validateCurrentStep, currentStep])
  

  const handleNext = () => {
    const isValid = validateCurrentStep()
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else if (!isValid) {
      alert('Please fill all required fields before moving to the next step.')
      return
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
    
  }

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Final validation check before submission
    const isValid = validateCurrentStep()
    if (!isValid) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      // Create form data object for multipart/form-data submission
      const formDataToSubmit = new FormData()

      // Make sure all these fields have actual values, not just placeholders
      formDataToSubmit.append('name', formData.personalInfo.name)
      formDataToSubmit.append('fatherName', formData.personalInfo.fatherName)
      formDataToSubmit.append('number', formData.personalInfo.number)
      formDataToSubmit.append('email', formData.personalInfo.email)
      formDataToSubmit.append('dob', formData.personalInfo.dob)
      formDataToSubmit.append('gender', formData.personalInfo.gender)
      formDataToSubmit.append('aadharNo', formData.personalInfo.aadharNo)

      // Course details - format price properly (remove currency symbol and commas)
      formDataToSubmit.append('course', formData.courseDetails.selectedCourse)
      formDataToSubmit.append('duration', formData.courseDetails.duration)
      // Fix price formatting - remove currency symbol and commas
      const numericPrice = formData.courseDetails.price.replace(/[^\d.]/g, '')
      formDataToSubmit.append('price', numericPrice)

      // Address details
      formDataToSubmit.append('address', formData.address.address)
      formDataToSubmit.append('country', formData.address.country)
      formDataToSubmit.append('state', formData.address.state)
      formDataToSubmit.append('city', formData.address.city)
      formDataToSubmit.append('pincode', formData.address.pincode)

      // Education details
      formDataToSubmit.append('qualification', formData.education.qualification)

      // File uploads - ensure these are actual File objects
      if (formData.documents.image instanceof File) {
        formDataToSubmit.append('image', formData.documents.image)
      }

      if (formData.documents.tenthDocument instanceof File) {
        formDataToSubmit.append(
          'tenthDocument',
          formData.documents.tenthDocument
        )
      }

      if (formData.documents.twelfthDocument instanceof File) {
        formDataToSubmit.append(
          'twelfthDocument',
          formData.documents.twelfthDocument
        )
      }

      // Submit the form data to the API
      const response = await fetch('/api/users/submit-course-form', {
        method: 'POST',
        body: formDataToSubmit,
      })

      // Debug the raw response before parsing JSON
      const responseText = await response.text()

      // Parse the JSON response (if it's valid JSON)
      let result
      try {
        result = JSON.parse(responseText)
      } catch (err) {
        alert('Server returned invalid JSON response')
        // throw new Error('Server returned invalid JSON response')
      }

      if (!response.ok) {
        // throw new Error(result.error || 'Failed to submit application')
        alert(result.error || 'Failed to submit application')
      }

      // Handle successful submission
      setSubmitSuccess(true)

      // Redirect to checkout page
      router.push({
        pathname: '/checkout',
        query: {
          course: formData.courseDetails.selectedCourse,
          duration: formData.courseDetails.duration,
          price: formData.courseDetails.price.replace(/[^\d.]/g, ''),
          studentName: formData.personalInfo.name,
          email: formData.personalInfo.email,
        },
      })
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      setIsSubmitting(false)
    }
  }
  if (!isOpen) return null

  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">Enroll in {courseTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {submitSuccess ? (
          <div className="p-8 text-center">
            <div className="mb-4 text-green-600 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-bold text-2xl">
                Application Submitted Successfully!
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Thank you for your application. We&apos;ll get back to you
              shortly.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            {/* Progress indicator */}
            <div className="mb-8">
               <div className="flex justify-between mb-2 px-2 sm:px-4 gap-2 flex-wrap">
                {[
                  'Personal Information',
                  'Address',
                  'Education',
                  'Documents',
                  'Review',
                ].map((step, index) => (
                  <div
                    key={step}
                    className={`text-xs font-medium w-full sm:w-auto ${
                      currentStep >= index + 1
                        ? 'text-blue-600'
                        : 'text-gray-400'
                    } text-center sm:text-left mb-2 sm:mb-0 `}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Error message if submission fails */}
            {submitError && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{submitError}</p>
              </div>
            )}

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">
                  Personal Information
                </h3>
                {/* Add this new field for course selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course*
                  </label>
                  <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                    {formData.courseDetails.selectedCourse}
                  </div>
                  <input
                    type="hidden"
                    name="selectedCourse"
                    value={formData.courseDetails.selectedCourse}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full border ${errors.personalInfo.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                      value={formData.personalInfo.name}
                      onChange={(e) =>
                        handleInputChange(
                          'personalInfo',
                          'name',
                          e.target.value
                        )
                      }
                    />
                     {errors.personalInfo.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.personalInfo.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Father&apos;s Name*
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full border ${errors.personalInfo.fatherName ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                      value={formData.personalInfo.fatherName}
                      onChange={(e) =>
                        handleInputChange(
                          'personalInfo',
                          'fatherName',
                          e.target.value
                        )
                      }
                    />
                     {errors.personalInfo.fatherName && (
                      <p className="text-red-500 text-xs mt-1">{errors.personalInfo.fatherName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      required
                      className={`w-full border ${errors.personalInfo.number ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                      value={formData.personalInfo.number}
                      onChange={(e) =>
                        handleInputChange(
                          'personalInfo',
                          'number',
                          e.target.value
                        )
                      }
                    />
                     {errors.personalInfo.number && (
                      <p className="text-red-500 text-xs mt-1">{errors.personalInfo.number}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      required
                      className={`w-full border ${errors.personalInfo.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                      value={formData.personalInfo.email}
                      onChange={(e) =>
                        handleInputChange(
                          'personalInfo',
                          'email',
                          e.target.value
                        )
                      }
                    />
                     {errors.personalInfo.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.personalInfo.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth*
                    </label>
                    <input
                      type="date"
                      required
                      className={`w-full border ${errors.personalInfo.dob ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                      value={formData.personalInfo.dob}
                      onChange={(e) =>
                        handleInputChange('personalInfo', 'dob', e.target.value)
                      }
                    />
                    {errors.personalInfo.dob && (
                      <p className="text-red-500 text-xs mt-1">{errors.personalInfo.dob}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aadhar Number*
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full border ${errors.personalInfo.aadharNo ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                      value={formData.personalInfo.aadharNo}
                      onChange={(e) =>
                        handleInputChange(
                          'personalInfo',
                          'aadharNo',
                          e.target.value
                        )
                      }
                     
                    />
                     {errors.personalInfo.aadharNo && (
                        <p className="text-red-500 text-xs mt-1">{errors.personalInfo.aadharNo}</p>
                      )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender*
                    </label>
                    <select
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={formData.personalInfo.gender}
                      onChange={(e) =>
                        handleInputChange(
                          'personalInfo',
                          'gender',
                          e.target.value
                        )
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">
                  Address Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complete Address*
                  </label>
                  <textarea
                    required
                    className={`w-full border ${errors.address.address ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                    rows={3}
                    value={formData.address.address}
                    onChange={(e) =>
                      handleInputChange('address', 'address', e.target.value)
                    }
                  ></textarea>
                  {errors.address.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address.address}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country*
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full border ${errors.address.country ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                      value={formData.address.country}
                      onChange={(e) =>
                        handleInputChange('address', 'country', e.target.value)
                      }
                    />
                     {errors.address.country && (
                      <p className="text-red-500 text-xs mt-1">{errors.address.country}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full border ${errors.address.state ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                      value={formData.address.state}
                      onChange={(e) =>
                        handleInputChange('address', 'state', e.target.value)
                      }
                    />
                    {errors.address.state && (
                      <p className="text-red-500 text-xs mt-1">{errors.address.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={formData.address.city}
                      onChange={(e) =>
                        handleInputChange('address', 'city', e.target.value)
                      }
                    />
                    {errors.address.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.address.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code*
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full border ${errors.address.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                      value={formData.address.pincode}
                      onChange={(e) =>
                        handleInputChange('address', 'pincode', e.target.value)
                      }
                    />
                     {errors.address.pincode && (
                      <p className="text-red-500 text-xs mt-1">{errors.address.pincode}</p>
                    )}
                    
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Education Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">
                  Education Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Highest Qualification*
                  </label>
                  <select
                    required
                    className="w-full border  : border-gray-300 rounded-md px-3 py-2"
                    value={formData.education.qualification}
                    onChange={(e) =>
                      handleInputChange(
                        'education',
                        'qualification',
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select</option>
                    <option value="10th">10th</option>
                    <option value="12th">12th</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Document Uploads */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Document Uploads</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo*
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    className={`w-full border ${errors.documents.image ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
                    onChange={(e) => handleFileChange('image', e.target.files)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a passport size photograph (max 1MB)
                  </p>
                  {errors.documents.image && (
                      <p className="text-red-500 text-xs mt-1">{errors.documents.image}</p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    10th Marksheet*
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*, application/pdf"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    onChange={(e) =>
                      handleFileChange('tenthDocument', e.target.files)
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a clear scan or photo of your 10th marksheet (max
                    2MB)
                  </p>
                  {errors.documents.tenthDocument && (
                      <p className="text-red-500 text-xs mt-1">{errors.documents.tenthDocument}</p>
                    )}

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    12th Marksheet*
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*, application/pdf"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    onChange={(e) =>
                      handleFileChange('twelfthDocument', e.target.files)
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a clear scan or photo of your 12th marksheet (max
                    2MB)
                  </p>
                  {errors.documents.twelfthDocument && (
                      <p className="text-red-500 text-xs mt-1">{errors.documents.twelfthDocument}</p>
                    )}
                  
                </div>
              </div>
            )}

            {/* Step 5: Review and Submit */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">
                  Review and Submit
                </h3>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Course Details</h4>
                  <p>Course: {formData.courseDetails.selectedCourse}</p>
                  <p>Duration: {formData.courseDetails.duration}</p>
                  <p>Price: {formData.courseDetails.price}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Personal Information</h4>
                  <p>Name: {formData.personalInfo.name}</p>
                  <p>Father&apos;s Name: {formData.personalInfo.fatherName}</p>
                  <p>Contact: {formData.personalInfo.number}</p>
                  <p>Email: {formData.personalInfo.email}</p>
                  <p>Date of Birth: {formData.personalInfo.dob}</p>
                  <p>Gender: {formData.personalInfo.gender}</p>
                  <p>Aadhar Number: {formData.personalInfo.aadharNo}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Address</h4>
                  <p>{formData.address.address}</p>
                  <p>
                    {formData.address.city}, {formData.address.state}
                  </p>
                  <p>
                    {formData.address.country} - {formData.address.pincode}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Education</h4>
                  <p>
                    Highest Qualification: {formData.education.qualification}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Documents Uploaded</h4>
                  <p>
                    Photo: {formData.documents.image?.name || 'Not uploaded'}
                  </p>
                  <p>
                    10th Marksheet:{' '}
                    {formData.documents.tenthDocument?.name || 'Not uploaded'}
                  </p>
                  <p>
                    12th Marksheet:{' '}
                    {formData.documents.twelfthDocument?.name || 'Not uploaded'}
                  </p>
                </div>

                <div className="flex items-start mt-6">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1"
                    checked={formData.termsAgreed}
                    onChange={(e) =>
                      handleInputChange(
                        'termsAgreed',
                        'termsAgreed',
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600">
                      terms and conditions
                    </a>{' '}
                    and confirm that all provided information is accurate.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 5 ? (
            <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={isSubmitting}
          >
            Next
          </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CourseModal
