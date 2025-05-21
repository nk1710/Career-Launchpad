import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const CareerDomains = () => {
  const [mounted, setMounted] = useState(false)
  // const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setMounted(true)

    // Stop animation after 5 seconds
    const animationTimer = setTimeout(() => {
      // setAnimate(false);
    }, 3000) // 5 seconds

    return () => clearTimeout(animationTimer) // Cleanup timer on unmount
  }, [])

  const domains = [
    {
      title: 'Diploma in Tourism Management',
      icon: '/T1.jpg',
      link: '/Tourism-management',
      descripption: 'Tourism Management',
    },
    {
      title: 'Diploma in Airport Management',
      icon: '/T5.jpg',
      link: '/Airport-management',
      descripption: 'Airport Management',
    },
    {
      title: 'Diploma in Hotel Management',
      icon: '/T3.jpg',
      link: '/Hotel-management',
      descripption: 'Hotel Management',
    },
    // { title: "Diploma in Metro Management", icon: "/T4.jpg", link: '/Metro-management', descripption: "Metro Management" },
    // { title: "Diploma in Merchant-Navy", icon: "/C4.jpg", link: '/Merchant-navy', descripption: "Merchant-Navy" },
    {
      title: 'C Programming + DSA ',
      icon: '/Java.jpg',
      link: '/C-DSA',
      descripption: 'C Programming + DSA',
    },
    {
      title: 'React-JS Development',
      icon: '/full.png',
      link: '/ReactDevelopment',
      descripption: 'React-JS Development',
    },
    {
      title: 'PHP + Laravel Development',
      icon: '/Laravel.jpg',
      link: '/Laravel-development',
      descripption: 'Laravel Development',
    },
    // { title: "MERN+DSA", icon: "/website Image 4.jpg", link: '/best-mern-dsa', descripption: "The aim of this course is to equip the students with the necessary tools for building capable and efficient web applications, combining essential DSA understanding with the power of the MERN stack consisting of MongoDB, Express.js, React, and Node.js. You will learn the usage of React for dynamic and interactive front-end development, Node.js-for reliable back-end creation with Express.js-and MongoDB for efficient data management. Alongside this, you will also learn the essentials of data structures, such as arrays, linked lists, stacks, queues, trees, and graphs, together with algorithms like searching, sorting, recursion, and dynamic programming to enable the code to be as efficient as possible and able to solve as much as possible." },
    // { title: "App+DSA", icon: "/website Image 5.jpg", link: '/best-app-dsa', descripption: "The course gives an intensive synthesis of the theory of computer science and the development of real-world applications. You will learn how to design, develop, and deploy an app across multiple platforms once you dive deep into app development. You will get hands-on experience in developing engaging user interfaces and functional aspects of an app right from ideation to deployment. At the same time, you will become proficient in the principles of algorithms and data structures, too. Mastering the effective use of data manipulation and storage goes a long way toward the realization of high-performance applications." },

    //         {
    //             title: "Digital Marketing Advanced", icon: "/DM Adv.jpg", link: '/best-digital-marketing-advanced', descripption: `This course, Advanced Digital Marketing, is specifically for those who need to make significant improvements in knowledge and skills related to the fast-evolving area of digital marketing. Now it's time to move into even more advanced strategies, tools, and techniques that will help you build a formidable online presence and drive real results.
    // Enroll in this highly rated online course called Digital Marketing Advanced course for expert-level skills with advanced career opportunities in the field of digital marketing at WsCube Tech. This course covers practical training, hands-on projects, certification, and job assistance; hence, this would be one of the finest courses any professional could take towards enhancing their digital marketing credentials.
    // Schedule a demo class now and take the next step in your digital marketing career!
    // ` },
  ]

  if (!mounted) {
    return null // Prevent rendering until after hydration
  }

  // Animation variants
  const cardVariants = {
    // hidden: { x: -200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
    normal: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      borderRadius: '10%',
    },
  }
  return (
    <div
      id="career-domains"
      className="relative bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 text-white py-24 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-teal-500 opacity-5 rounded-full blur-3xl"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Circuit board pattern for tech feeling */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            ></path>
            <circle cx="50" cy="50" r="3" fill="white"></circle>
            <path d="M50,50 L50,0" stroke="white" strokeWidth="0.5"></path>
            <path d="M50,50 L100,50" stroke="white" strokeWidth="0.5"></path>
            <path d="M50,50 L50,100" stroke="white" strokeWidth="0.5"></path>
            <path d="M50,50 L0,50" stroke="white" strokeWidth="0.5"></path>
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#circuit-pattern)"
          ></rect>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Heading section with decorative elements */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Industry-Ready
            </span>{' '}
            Career Tracks
          </h2>

          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Our placement-focused programs are designed with industry partners
            to ensure you develop in-demand skills that employers are actively
            seeking.
          </p>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        </div>

        {/* Career domain cards with enhanced design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-12">
          {domains.map((domain) => (
            <motion.div
              key={domain.title}
              variants={cardVariants}
              initial="hidden"
              className="relative group"
            >
              {/* Card background with glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl transform transition-all duration-300 group-hover:scale-105 group-hover:from-blue-800/40 group-hover:to-purple-800/40 opacity-0 group-hover:opacity-100"></div>

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-blue-900/20 group-hover:shadow-2xl">
                {/* Top accent bar */}
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                {/* Content wrapper */}
                <div className="p-8 text-center">
                  <Link href={domain.link}>
                    <div className="mb-6 relative">
                      {/* Icon circle background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-gray-900 rounded-full transform scale-75 transition-transform duration-300 group-hover:scale-90"></div>

                      {/* Actual icon with hover effect */}
                      <motion.img
                        src={domain.icon}
                        alt={domain.title}
                        className="w-24 h-24 mx-auto relative z-10 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Link>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {domain.title}
                    </h3>

                    <div className="pt-2 pb-2">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="text-xs text-gray-400">
                          Placement Rate
                        </div>
                        <div className="text-xs font-semibold text-blue-400">
                          92%
                        </div>
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: '92%' }}
                        ></div>
                      </div>
                    </div>

                    <Link href={domain.link}>
                      <div className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-600 hover:shadow-lg">
                        <span className="flex items-center">
                          Explore Career Track
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Bottom tag showing industry partners */}
                <div className="bg-gray-800 py-2 px-4 border-t border-gray-700">
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>Industry Partners</span>
                    <span className="font-semibold text-gray-300">12+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CareerDomains
