import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from './Image'

const CareerDomains2 = () => {
  const [mounted, setMounted] = useState(false)
  // const [animate, setAnimate] = useState(true)

  useEffect(() => {
    setMounted(true)
    const animationTimer = setTimeout(() => {
      // setAnimate(false)
    }, 10000) // 10 seconds

    return () => clearTimeout(animationTimer)
  }, [])

  const domains = [
    {
      title: 'Frontend Development',
      icon: '/full.png',
      link: '/Frontend-development',
    },
    {
      title: 'PHP Laravel Development',
      icon: '/Laravel.jpg',
      link: '/Laravel-development',
    },
    {
      title: 'React js Development',
      icon: '/full.png',
      link: '/ReactDevelopment',
    },
    { title: 'CoreJava+DSA', icon: '/Laravel.jpg', link: '/CoreJava' },
    { title: 'C++ with DSA', icon: '/C++.jpg', link: '/Programming-DSA' },
    { title: 'Advanced Java', icon: '/Advanced-Java.jpg', link: '/Advanced-Java' }
  ]

  if (!mounted) {
    return null // Prevent rendering until after hydration
  }

  // const cardVariants = {
  //   visible: {
  //     x: 0,
  //     opacity: 1,
  //     transition: {
  //       type: 'spring',
  //       bounce: 0.4,
  //       duration: 0.8,
  //     },
  //   },
  //   normal: {
  //     x: 0,
  //     opacity: 1,
  //     scale: 1,
  //     rotate: 0,
  //     borderRadius: '10%',
  //   },
  // }
  return (
    <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black-600">
          Explore Top Career Domains
        </h1>
        <p className="mt-4 text-lg">
          Discover career paths that truly resonate with your passion & explore
          mentorship programs that align perfectly with you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 lg:px-24">
        {domains.map((domain) => (
          <motion.div
            key={domain.title}
            initial="hidden"
            className="bg-white text-center p-8 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <Link href={domain.link}>
              <div className="transition-transform duration-300">
                <motion.div>
                  <Image
                    src={domain.icon}
                    alt={domain.title}
                    width={180} // Set explicit width
                    height={190} // Set explicit height
                    className="mx-auto mb-4"
                    priority // Optionally load the image with priority
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 30vw, 25vw" // Responsive sizes
                  />
                </motion.div>
                <h2 className="text-xl font-semibold mb-2 text-blue-950">
                  {domain.title}
                </h2>
                <span className="text-blue-600 hover:underline">
                  See Programs &gt;
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CareerDomains2
