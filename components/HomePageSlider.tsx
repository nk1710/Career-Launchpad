import React, { useState, useEffect } from 'react'
import Image from '../components/Image'
import { useRouter } from 'next/router'
import { ChevronRight, Award, Users, Check } from 'lucide-react'
import { useRef } from "react";

const HomePageSlider = () => {
  const router = useRouter()
  const [currentProgram, setCurrentProgram] = useState(0)

  // Featured programs data
  const programs = [
    {
      title: 'Tourism Management',
      description:
        'International tourism operations and destination management',
      icon: '🌎',
      image: '/T1.jpg',
      stats: ['3-month diploma', '95% placement', 'Study abroad options'],
      slug: 'Tourism-management', // Added slug for routing
    },
    {
      title: 'Hotel Management',
      description: 'Hospitality excellence and customer service leadership',
      icon: '🏨',
      image: '/H1.png',
      stats: [
        '6-month program',
        'Industry partnerships',
        'Internship included',
      ],
      slug: 'Hotel-management', // Added slug for routing
    },
    {
      title: 'Metro Management',
      description: 'Urban transportation management and safety protocols',
      icon: '🚇',
      image: '/Metro.jpg',
      stats: [
        '3-month certification',
        'Technical training',
        'Metro partnerships',
      ],
      slug: 'Metro-management', // Added slug for routing
    },
    {
      title: 'Airport Management',
      description: 'Aviation services and terminal operations training',
      icon: '✈️',
      image: '/C2.jpg',
      stats: [
        '3-month diploma',
        'Aviation authority approved',
        'Hands-on training',
      ],
      slug: 'Airport-management', // Added slug for routing
    },
  ]

  // Auto-rotate through programs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgram((prev) => (prev + 1) % programs.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [programs.length]) // Added programs.length to dependency array

  // const handleExplorePrograms = () => {
  //   router.push('/login')
  // }

//   scroll to the career domains section
  const handleExplorePrograms = () => {
    const section = document.getElementById('career-domains');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

    const programCardRef = useRef<HTMLDivElement>(null);
  
    const handleProgramClick = (idx:number) => {
      setCurrentProgram(idx);
  
      // Scroll to the program card on small screens
      if (window.innerWidth < 640 && programCardRef.current) {
        // sm breakpoint is usually 640px in Tailwind
        setTimeout(() => {
          programCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // slight delay ensures rendering is completed
      }
    };

  // const handleRequestBrochure = () => {
  //   router.push('/brochure');
  // };

  // Function to handle apply button clicks for specific programs
  const handleApplyNow = () => {
    // Get current program slug
    const programSlug = programs[currentProgram].slug
    // Redirect to application page with program parameter
    router.push(`/${programSlug}`)
  }



  return (
    <div className="relative overflow-hidden">
      {/* Dynamic background with gradient overlay - Changed colors from purple to teal/blue */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-700 via-blue-600 to-cyan-800 overflow-hidden">
        {/* Background image that changes with program */}
        <div className="absolute inset-0 opacity-20 transition-opacity duration-1000">
          <Image
            src={programs[currentProgram].image}
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Animated particles/shapes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-float"
              style={{
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-12 pb-28 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left column - Main heading and program tabs */}
          <div className="text-white">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-white/90 text-sm font-medium mr-2">
                Launching careers since 2015
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Shape Your Future with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-300 to-green-200">
                Specialized Career Programs
              </span>
            </h1>

            <p className="text-lg text-white/85 mb-8 max-w-xl">
              Industry-focused diplomas designed to prepare you for rewarding
              careers in high-demand sectors with placement assistance.
            </p>

            {/* Program selection tabs */}
            <div className="grid grid-cols-2 sm:flex flex-wrap gap-3 mb-8">
              {programs.map((program, idx) => (
                <button
                  key={idx}
                  onClick={() => handleProgramClick(idx)}
                  className={`flex items-center justify-center text-sm px-2 py-2 sm:px-4 sm:py-2 rounded-full transition-all duration-300 ${
                    currentProgram === idx
                      ? 'bg-white text-teal-700 shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="mr-1 sm:mr-2">{program.icon}</span>
                  <span className="font-medium">{program.title}</span>
                </button>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handleExplorePrograms}
                className="bg-white text-teal-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                Explore Programs <ChevronRight className="w-5 h-5" />
              </button>
              {/* <button
                onClick={handleRequestBrochure}
                className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Request Brochure
              </button> */}
            </div>
          </div>

          {/* Right column - Program showcase card */}
          {/* Target scroll section */}
          <div className="relative" ref={programCardRef}>
            {/* Highlighted program card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-xl transform transition-all duration-500">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={programs[currentProgram].image}
                  alt={programs[currentProgram].title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <span className="text-3xl mr-2">
                        {programs[currentProgram].icon}
                      </span>
                      {programs[currentProgram].title}
                    </h3>
                    <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm text-white">
                      Enrollment Open
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-medium text-white/90 mb-2">
                    Program Highlights
                  </h4>
                  <p className="text-white/80">
                    {programs[currentProgram].description}
                  </p>
                </div>

                <div className="space-y-3">
                  {programs[currentProgram].stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <Check className="w-5 h-5 text-green-400" />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 rounded-full p-2">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Job Guarantee Program
                      </h4>
                      <p className="text-sm text-white/70">
                        Get placed or get your money back
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border-t border-white/10 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 rounded-full p-2">
                    <Users className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="text-white/80 text-sm">
                    <span className="font-medium">Limited Seats</span>
                    {/* <span className="mx-2">•</span>
                    <span>Next Batch: May 2025</span> */}
                  </div>
                </div>
                <button
                  onClick={handleApplyNow}
                  className="bg-white text-teal-700 hover:bg-gray-100 font-medium text-sm py-2 px-4 rounded-lg transition-all flex items-center gap-1"
                >
                  Apply for {programs[currentProgram].title.split(' ')[0]}
                </button>
              </div>
            </div>

            {/* Decorative elements - changed colors */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>

      {/* Small logo in bottom corner */}
      {/* <div className="absolute bottom-20 right-10 z-10">
        <div className="bg-white/80 rounded-full p-2 shadow-lg">
          <Image 
            src="/bg2.png" 
            alt="Institute Logo" 
            width={40} 
            height={40} 
          />
        </div>
      </div> */}

      {/* Add custom animation for floating elements */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default HomePageSlider
