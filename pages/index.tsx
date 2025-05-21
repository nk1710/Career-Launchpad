import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Layout from '../components/Layout'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from '../components/Image'
import HomePageSlider from '../components/HomePageSlider'
import AnimatedComponent from '../components/AnimatedComponent'
import CareerDomains from '../components/CareerDomains'
import Link from 'next/link'
// import Slider from 'react-slick';
import JobGuaranteeSlider from '../components/JobGuaranteeSlider'
// import HomePageImagePopup from '../components/HomePageImagePopup';
// import {  useState } from 'react';
import Testimonials from '../components/Testimonials'
import { useEffect, useState } from 'react' // Import useState and useEffect
import Modal from '../components/Modal' // Import your existing Modal component
// Import your existing login form component
// (adjust the path based on your project structure)
import LoginForm from '../components/Loginform'
const programs = [
  {
    title: 'Diploma in Merchant Navy',
    href: '/Merchant-navy',
  },
  {
    title: 'Diploma in Metro Management',
    href: '/Metro-management',
  },
  {
    title: 'Diploma in Hotel Management',
    href: '/Hotel-management',
  },
  {
    title: 'Diploma in Tourism Management',
    href: '/Tourism-management',
  },
  {
    title: 'Diploma in Airport Management',
    href: '/Airport-management',
  },
]
const testimonials = [
  {
    name: 'Ayush Sharma',
    role: 'Student',
    image: '/Ayush.jpg',
    text: "Enrolling in the Airport Management Diploma program at Career Launchpad was one of the best decisions I've made for my career. The instructors are industry experts who provide valuable insights and hands-on experience. The curriculum is well-structured and covers all aspects of airport operations, giving students a comprehensive understanding of the industry. I highly recommend Career Launchpad to anyone looking to pursue a career in airport management.",
    rating: 5,
  },
  {
    name: 'Mangesh Kaur',
    role: 'Student',
    image: '/Mangesh.jpg',
    text: 'Completing the Diploma in Merchant Management at Career Launchpad was a game-changer for my career. The program provided me with the knowledge and skills needed to excel in the dynamic world of merchant management. The faculty members are experienced professionals who offer practical insights and mentorship. The curriculum is up-to-date and relevant, covering key topics such as retail strategy, inventory management, and customer engagement. I am grateful for the opportunity to study at Career Launchpad and highly recommend it to aspiring merchant managers',
    rating: 5,
  },
]
const Home: React.FC = () => {
  const chunks = []
  for (let i = 0; i < testimonials.length; i += 3) {
    chunks.push(testimonials.slice(i, i + 3))
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    const lastClosed = localStorage.getItem('modal-last-closed')
  
    if (!token) {
      const now = Date.now()
  
      // Show modal if:
      // - modal was never closed before, or
      // - modal was closed, but now we're in a new visit (full refresh)
      if (!lastClosed || now - parseInt(lastClosed) > 1000) {
        setIsLoginModalOpen(true)
      }
    }
  }, [])

  // Handle modal close
  const handleModalClose = () => {
    setIsLoginModalOpen(false)
    localStorage.setItem('modal-last-closed', Date.now().toString())
  }
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  // Registration states
  const [isModalRegisterPage, setIsModalRegisterPage] = useState(false)
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.removeItem('modal-last-closed') // optional
        setIsLoginModalOpen(false)
      
      
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterLoading(true)
    setRegisterError('')

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          phone: registerPhone,
        }),
      })

      if (res.ok) {
        // Set success message and flip back to login form
        setSuccessMessage('Registration successful! Please log in.')
        setIsModalRegisterPage(false)
        
        // Reset registration form
        setRegisterUsername('')
        setRegisterEmail('')
        setRegisterPassword('')
        setRegisterPhone('')
      } else {
        const data = await res.json()
        setRegisterError(data.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      setRegisterError('An error occurred. Please try again.')
    } finally {
      setRegisterLoading(false)
    }
  }
  
  // Function to toggle between login and register within modal
  const toggleModalForm = () => {
    setIsModalRegisterPage(!isModalRegisterPage)
  }

  return (
    <Layout>
      <div>
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: 'Home Page',
                description: 'Welcome to the home page of Career Launchpad.',
                url: 'https://www.placementinstitute.com/',
              }),
            }}
          />
        </Head>
        <NextSeo
          title="Career Launchpad"
          description="Welcome to Career Launchpad, your premier source for online skill development programs. Join us to enhance your skills and achieve your goals."
          openGraph={{
            title: 'Career Launchpad',
            description:
              'Welcome to Career Launchpad, your premier source for online skill development programs. Join us to enhance your skills and achieve your goals.',
            images: [
              {
                url: 'https://www.placementinstitute.com/og-image.jpg',
                width: 800,
                height: 600,
                alt: 'Career Launchpad',
              },
            ],
          }}
        />
        <HomePageSlider />
        <JobGuaranteeSlider />
      </div>

      {/*  <HomePageImagePopup
        imageUrl='/popup.png' // Replace with your image URL
        title=""
        description=""
        isOpen={isOpen}
        onClose={handleClose}
      /> */}
      {/* Add your existing Modal component with the login form */}
      <Modal
  isOpen={isLoginModalOpen}
  onClose={handleModalClose}
>
        <LoginForm onClose={handleModalClose}
          // Login props
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          successMessage={successMessage}
          
          // Register props
          isRegisterPage={isModalRegisterPage}
          registerUsername={registerUsername}
          setRegisterUsername={setRegisterUsername}
          registerEmail={registerEmail}
          setRegisterEmail={setRegisterEmail}
          registerPassword={registerPassword}
          setRegisterPassword={setRegisterPassword}
          registerPhone={registerPhone}
          setRegisterPhone={setRegisterPhone}
          handleRegisterSubmit={handleRegisterSubmit}
          registerLoading={registerLoading}  
          registerError={registerError}
          
          // Special prop for modal behavior
          isInModal={true}
          toggleForm={toggleModalForm}
        />
      </Modal>

      <AnimatedComponent>
        <div className="relative flex flex-col items-center py-20 px-4 md:px-12 overflow-hidden">
          {/* Custom background with shapes */}
          <div className="absolute inset-0 bg-slate-900 z-0">
            {/* Abstract geometric shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl opacity-10"></div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('/dotted-pattern.png')] opacity-5"></div>

            {/* Angled divider */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-30 transform -skew-y-6 translate-y-12"></div>
            </div>
          </div>

          {/* Content container with 3D effect */}
          <div className="relative z-10 w-full max-w-6xl bg-slate-800 bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-slate-700 border-opacity-70">
            {/* Floating elements for visual interest */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-green-500 rounded-xl transform rotate-12"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-500 rounded-full"></div>

            {/* Heading with accent mark */}
            <div className="mb-12 text-center">
              <div className="inline-block relative">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
                  Programs{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500">
                    Offered
                  </span>
                </h1>
                <div className="absolute -right-8 top-0 w-6 h-6 bg-yellow-400 rounded-full"></div>
              </div>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Cutting-edge training to launch your tech career
              </p>
            </div>

            {/* Cards in a completely new style */}
            <div className="grid gap-10 md:grid-cols-2">
              {/* Full Stack Development Card */}
              <div className="relative group">
                {/* Card background with hoverable effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl transform transition-all duration-300 group-hover:scale-105 group-hover:from-blue-500/30 group-hover:to-indigo-600/30"></div>

                {/* Card content */}
                <div className="relative overflow-hidden rounded-xl border border-slate-700 backdrop-filter backdrop-blur-sm">
                  {/* Image header section - IMPROVED */}
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/FullStackDevelopment.jpg"
                      alt="Full Stack Development"
                      width={600}
                      height={300}
                      unoptimized
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 brightness-125 contrast-110"
                    />

                    {/* Overlay with icon - REDUCED OPACITY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent">
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-lg mr-4 shadow-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                              />
                            </svg>
                          </div>
                          <h2 className="text-lg sm:text-2xl font-semibold sm:font-bold text-white drop-shadow-md">
                            Development
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="p-6 bg-slate-800 border-t border-slate-700">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/50 rounded-full">
                        JavaScript
                      </span>
                      <span className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/50 rounded-full">
                        React
                      </span>
                      <span className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/50 rounded-full">
                        Node.js
                      </span>
                    </div>

                    <p className=" sm:text-base leading-relaxed text-slate-300 mb-3 text-justify ">
                      Working on various aspects of a web application is known
                      as development. This includes building user interfaces
                      (UI) that users interact with, as well as handling
                      server-side logic to ensure the application functions
                      smoothly.
                    </p>

                    <Link href="/Development">
                      <button className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                        View All Courses
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Digital Marketing Card */}
              <div className="relative group">
                {/* Card background with hoverable effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl transform transition-all duration-300 group-hover:scale-105 group-hover:from-purple-500/30 group-hover:to-pink-600/30"></div>

                {/* Card content */}
                <div className="relative overflow-hidden rounded-xl border border-slate-700 backdrop-filter backdrop-blur-sm">
                  {/* Image header section - IMPROVED */}
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/DigitalMarketing.jpg"
                      alt="Digital Marketing"
                      width={600}
                      height={300}
                      unoptimized
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 brightness-125 contrast-110"
                    />

                    {/* Overlay with icon - REDUCED OPACITY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent">
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 flex items-center justify-center bg-purple-600 rounded-lg mr-4 shadow-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                              />
                            </svg>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-semibold sm:font-bold text-white drop-shadow-md">
                            Programming
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="p-6 bg-slate-800 border-t border-slate-700">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-900/50 rounded-full">
                        Java
                      </span>
                      <span className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-900/50 rounded-full">
                        DSA
                      </span>
                      <span className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-900/50 rounded-full">
                        SQL
                      </span>
                    </div>

                    <p className=" sm:text-base leading-relaxed text-slate-300 mb-4 text-justify ">
                      The technique of creating software and applications is
                      known as programming. To build and manage digital
                      solutions, it involves skills like front-end development,
                      back-end coding, and database integration.
                    </p>

                    <Link href="/Development">
                      <button className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                        View All Courses
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedComponent>
      <AnimatedComponent>
        <CareerDomains  />
      </AnimatedComponent>

      {/* you tube video auto playing  */}

      {/* <AnimatedComponent>
        <div className="relative pb-[56.25%] h-0 overflow-hidden px-5 mt-10 py-2 bg-green-50">
          <video
            src="/videoplayback.mp4"
            autoPlay
            loop
            muted // Optional: Add this if you want the video to play without sound
            // className="w-full h-full" // Uncomment this line to set the video to fill the container
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </AnimatedComponent> */}
      {/* new sections */}

      <AnimatedComponent>
        <section className="py-16 px-6 md:py-20 md:px-12 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Container with maximum width */}
          <div className="max-w-5xl mx-auto relative z-10">
            {/* Main quote card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12 shadow-xl mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <svg
                    className="w-16 h-16 text-blue-400 opacity-80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-8">
                  We aim at inspiring our students to dream more, learn more, do
                  more, and become more in their respective journeys of life.
                </blockquote>

                <div className="flex items-center justify-center"></div>
              </div>
            </div>

            {/* Additional quotes carousel */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Quote from Nelson Mandela */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 transform transition-all duration-300 hover:bg-white/10">
                <div className="flex mb-4">
                  <div className="text-yellow-400 mr-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-white italic text-lg">
                    &ldquo;Education is the most powerful weapon which you can
                    use to change the world.&rdquo;
                  </p>
                </div>
                <p className="text-right text-blue-300 text-sm font-medium">
                  — Nelson Mandela
                </p>
              </div>

              {/* Quote from Steve Jobs */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 transform transition-all duration-300 hover:bg-white/10">
                <div className="flex mb-4">
                  <div className="text-yellow-400 mr-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-white italic text-lg">
                    &ldquo;Your work is going to fill a large part of your life,
                    and the only way to be truly satisfied is to do what you
                    believe is great work.&rdquo;
                  </p>
                </div>
                <p className="text-right text-blue-300 text-sm font-medium">
                  — Steve Jobs
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedComponent>

      {/* <NextSeo title="Home - Products" /> */}

      {/* why choose us  */}
      <AnimatedComponent>
        <div className="flex flex-col items-center py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
          <h2 className="text-5xl font-bold mb-12 text-blue-800 relative">
            Why Choose Our Institute?
            <span className="block h-1 w-32 bg-yellow-500 mt-3 mx-auto"></span>
          </h2>

          {/* Featured Courses Banner */}
          <div className="w-full bg-blue-800 text-white py-10 px-4 rounded-lg mb-12 shadow-lg">
  <h3 className="text-2xl font-bold text-center mb-6">Our Premier Career Programs</h3>
  <div className="flex flex-wrap justify-center gap-3">
    {programs.map((program) => (
      <Link
        key={program.href}
        href={program.href}
        className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-full font-medium cursor-pointer hover:bg-yellow-400 transition"
      >
        {program.title}
      </Link>
    ))}
  </div>
</div>
          {/* Main features in alternating layout */}
          <div className="w-full max-w-6xl">
            {/* Feature 1 - Left image, right text */}
            <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-200 rounded-lg transform rotate-3"></div>
                  <Image
                    className="relative z-10 rounded-lg shadow-xl w-full h-64 md:h-80 object-cover"
                    src="/I1.jpg"
                    alt="Industry Experts"
                    width={600}
                    height={300}
                    unoptimized
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold text-blue-800 mb-4">
                  Learn from Industry Experts
                </h3>
                <p className="text-gray-700 mb-4  sm:text-base leading-relaxed text-justify sm:text-left">
                  Our faculty consists of professionals with extensive industry
                  experience who bring real-world insights directly to the
                  classroom. Their practical knowledge ensures you gain relevant
                  skills that employers actually need.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    Mentorship from professionals with 10+ years of experience
                  </li>
                  <li>
                    Designed to equip students with the skills employers
                    actually look for
                  </li>
                  <li>Curriculum designed with input from leading companies</li>
                </ul>
              </div>
            </div>

            {/* Feature 2 - Right image, left text */}
            <div className="flex flex-col md:flex-row-reverse items-center mb-16 gap-8">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-200 rounded-lg transform -rotate-3"></div>
                  <Image
                    className="relative z-10 rounded-lg shadow-xl w-full h-64 md:h-80 object-cover"
                    src="/I2.jpg"
                    alt="Placement Assistance"
                    width={600}
                    height={300}
                    unoptimized
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold text-blue-800 mb-4">
                  Guaranteed Placement Assistance
                </h3>
                <p className="text-gray-700 mb-4  sm:text-base leading-relaxed text-justify">
                  Our dedicated placement cell works tirelessly to connect
                  students with top employers in their chosen fields. With a 92%
                  placement record, we&apos;re committed to launching your
                  career successfully.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-100 p-3 rounded-lg text-center">
                    <span className="block text-3xl font-bold text-blue-800">
                      92%
                    </span>
                    <span className="text-sm text-gray-700">
                      Placement Rate
                    </span>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg text-center">
                    <span className="block text-3xl font-bold text-blue-800">
                      150+
                    </span>
                    <span className="text-sm text-gray-700">
                      Corporate Partners
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Left image, right text */}
            <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-200 rounded-lg transform rotate-3"></div>
                  <Image
                    className="relative z-10 rounded-lg shadow-xl w-full h-64 md:h-80 object-cover"
                    src="/I3.jpg"
                    alt="Hands-on Training"
                    width={600}
                    height={300}
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold text-blue-800 mb-4">
                  Hands-on Practical Training
                </h3>
                <p className="text-gray-700  sm:text-base leading-relaxed text-justify mb-4">
                  We believe in learning by doing. Our courses include extensive
                  practical sessions, industry visits, and internship
                  opportunities that give you the confidence to tackle
                  real-world challenges.
                </p>
                <div className="bg-blue-800 text-white p-4 rounded-lg">
                  <h4 className="font-bold   mb-2">Training Highlights:</h4>
                  <p className='sm:text-base leading-relaxed text-justify'>
                    State-of-the-art simulation labs, hands-on projects designed
                    by industry experts, and mandatory internships with our
                    partner organizations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <h3 className="text-3xl font-bold text-blue-800 mt-8 mb-10">
            Additional Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-t-4 border-blue-600">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3 text-center text-gray-800">
                Flexible Scheduling
              </h4>
              <p className="text-gray-600 text-center">
                Choose from morning, evening, and weekend batches to fit your
                studies around your existing commitments.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-t-4 border-yellow-500">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3 text-center text-gray-800">
                Recognized Certifications
              </h4>
              <p className="text-gray-600 text-center">
                At Career Launchpad, we offer a variety of certificate
                programs designed to enhance your skills and advance your
                career. Our certificate courses cover a range of subjects, from
                business management and marketing to technology and healthcare.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-t-4 border-green-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3 text-center text-gray-800">
                Supportive Community
              </h4>
              <p className="text-gray-600 text-center">
                Join a network of alumni and industry professionals who provide
                mentorship and career opportunities throughout your professional
                journey.
              </p>
            </div>
          </div>
        </div>
      </AnimatedComponent>
      <Testimonials />
      {/* Career Launchpad */}
    </Layout>
  )
}
export default Home
