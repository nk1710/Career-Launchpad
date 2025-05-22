import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


const CourseUse = () => {
  // Define card content for programming and development
  const useCases = [
    {
      title: "Software Development",
      description: "Build complete applications from scratch using industry-standard programming languages and frameworks. Create efficient, scalable solutions for real-world problems across various domains.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      bgColor: "from-blue-400 to-blue-600",
      iconColor: "bg-blue-500",
      shadowColor: "shadow-blue-500/20",
      borderColor: "border-blue-400"
    },
    {
      title: "Web Development",
      description: "Design and develop responsive, interactive websites and web applications using modern front-end frameworks and back-end technologies. Create seamless user experiences across all devices.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      bgColor: "from-purple-400 to-purple-600",
      iconColor: "bg-purple-500",
      shadowColor: "shadow-purple-500/20",
      borderColor: "border-purple-400"
    },
    {
      title: "Mobile App Development",
      description: "Create native and cross-platform mobile applications for iOS and Android. Develop apps that leverage device capabilities while providing excellent performance and user experience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: "from-green-400 to-green-600",
      iconColor: "bg-green-500",
      shadowColor: "shadow-green-500/20",
      borderColor: "border-green-400"
    },
    {
      title: "Backend Systems & APIs",
      description: "Design robust server-side applications, microservices, and APIs that power modern applications. Build scalable systems that handle high traffic and complex data operations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
        </svg>
      ),
      bgColor: "from-red-400 to-red-600",
      iconColor: "bg-red-500",
      shadowColor: "shadow-red-500/20",
      borderColor: "border-red-400"
    },
    {
      title: "Database Management",
      description: "Develop expertise in designing, implementing and optimizing database systems. Work with SQL and NoSQL databases to create efficient data storage and retrieval solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      bgColor: "from-yellow-400 to-yellow-600",
      iconColor: "bg-yellow-500",
      shadowColor: "shadow-yellow-500/20",
      borderColor: "border-yellow-400"
    },
    {
      title: "Emerging Technologies",
      description: "Stay at the cutting edge with skills in AI, machine learning, blockchain, and IoT development. Apply programming knowledge to the most innovative and disruptive technologies.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      bgColor: "from-indigo-400 to-indigo-600",
      iconColor: "bg-indigo-500",
      shadowColor: "shadow-indigo-500/20",
      borderColor: "border-indigo-400"
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const cardsRef = useRef([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Add 3D tilt effect for cards
    // const cards = cardsRef.current;
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      if (!card) return;
      
      
      const handleMouseMove = (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Calculate rotation based on mouse position
        const rotateY = 15 * (mouseX / (cardRect.width / 2));
        const rotateX = -15 * (mouseY / (cardRect.height / 2));
        
        // Apply transformation
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Update radial gradient position for light effect
        const light = card.querySelector('.card-light');
        if (light) {
          const x = ((e.clientX - cardRect.left) / cardRect.width) * 100;
          const y = ((e.clientY - cardRect.top) / cardRect.height) * 100;
          light.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 80%)`;
          light.style.opacity = '1';
        }
      };
      
      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        const light = card.querySelector('.card-light');
        if (light) {
          light.style.opacity = '0';
        }
      };
      
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      // Cleanup
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  // Function to add cards to ref array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-24 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative z-10"
        >
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Career Paths in Programming & Development
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive programming courses prepare you for diverse roles across the tech industry
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {useCases.map((useCase, index) => (
            <motion.div 
              key={index}
              ref={addToRefs}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`relative bg-gray-800 rounded-xl ${useCase.shadowColor} shadow-xl overflow-hidden cursor-pointer transition-all duration-300 group`}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                transition: "transform 0.3s ease",
                borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0"></div>
              
              {/* Card light effect */}
              <div className="card-light absolute inset-0 opacity-0 transition-opacity duration-300 z-10"></div>
              
              {/* Card border glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${useCase.bgColor} rounded-xl filter blur-md -z-10`}></div>
              
              {/* Card content */}
              <div className="p-8 relative z-20 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <motion.div 
                    whileHover={{ rotateY: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`w-16 h-16 rounded-2xl ${useCase.iconColor} text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500`}
                    style={{ 
                      transformStyle: "preserve-3d",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    {useCase.icon}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={`w-6 h-6 rounded-full ${useCase.borderColor} bg-gray-900 border-2 flex items-center justify-center`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </div>
                
                <div className="transform group-hover:translate-z-10 transition-transform duration-300">
                  <h3 className={`text-2xl font-bold mb-4 text-white`}>
                    {useCase.title}
                  </h3>
                  <p className="text-gray-300 mb-8">
                    {useCase.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <motion.div 
                    className="overflow-hidden relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  >
                    {/* <motion.button 
                      className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${useCase.bgColor} text-white font-medium transition-all duration-300 flex items-center justify-between group-hover:shadow-lg transform group-hover:translate-y-0`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
                    >
                      <span>Explore Career Path</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button> */}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-24 relative z-10"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-2 shadow-2xl transform-gpu overflow-hidden relative hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl z-0 opacity-30"></div>
            <div className="border border-gray-700 rounded-xl bg-gray-800/60 backdrop-blur p-8 relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Why Programming Skills Are Essential Today
                  </span>
                  <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8  sm:px-6 md:px-8  ">
  {[
    {
      title: "High-Demand Skillset",
      description:
        "Programming skills are consistently among the most sought-after by employers across industries. The demand for qualified developers continues to grow as businesses undergo digital transformation and automation.",
      color: "blue",
      gradient: "from-orange-500 to-orange-600",
      shadow: "shadow-orange-500/20",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6 "
          />
        </svg>
      ),
    },
    {
      title: "Competitive Compensation",
      description:
        "Entry-level programming positions typically start at ₹4-6 LPA, with experienced developers earning ₹15-30+ LPA. Specialized roles in emerging technologies can command even higher salaries.",
      color: "blue",
      gradient: "from-green-500 to-green-600",
      shadow: "shadow-green-500/20",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Remote Work Opportunities",
      description:
        "Programming jobs offer excellent remote work options, allowing developers to work from anywhere. This flexibility has become increasingly valuable in today's evolving workplace environment.",
      color: "blue",
      gradient: "from-purple-500 to-purple-600",
      shadow: "shadow-purple-500/20",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Career Growth Paths",
      description:
        "Developers can advance to senior roles, technical leadership positions, or specialize in high-demand areas like cloud architecture, cybersecurity, or AI/ML engineering as their careers progress.",
      color: "blue",
      gradient: "from-red-500 to-red-600",
      shadow: "shadow-red-500/20",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ].map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
      whileHover={{
        scale: 1.03,
        translateZ: 20,
        rotate: [0, 1, 0],
      }}
      className={`bg-gray-800 border border-gray-700 rounded-xl   ${item.shadow} transform-gpu transition-all duration-300 `}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
      }}
    >
      

      <div className="flex flex-col  sm:items-center m-3 sm:justify-between gap-4 ">
  {/* Icon Box */}
  <div
    className={`rounded-lg bg-gradient-to-br ${item.gradient} p-4 text-white w-full sm:w-auto flex justify-center sm:justify-start`}
    style={{
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      transform: "translateZ(20px)",
    }}
  >
    {item.icon}
  </div>

  {/* Text Content */}
  <div
    className="flex-1"
    style={{ transform: "translateZ(10px)" }}
  >
    <h4 className={`text-lg sm:text-xl font-bold mb-2 text-${item.color}-400`}>
      {item.title}
    </h4>
    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
      {item.description}
    </p>
  </div>
</div>

    </motion.div>
  ))}
</div>

            </div>
          </div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-16 text-center relative z-10"
        >
          {/* <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
            Explore All Programming Courses
          </button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default CourseUse;