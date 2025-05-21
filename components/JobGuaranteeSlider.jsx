// components/JobGuaranteeSlider.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, TrendingUp, Globe } from 'lucide-react';
import { useRouter } from 'next/router';


const ProfessionalSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Elevate Your Professional Potential",
      subtitle: "Precision Training. Guaranteed Success.",
      background: "bg-gradient-to-r from-slate-800 to-slate-900",
      icon: Briefcase
    },
    {
      title: "Strategic Career Acceleration",
      subtitle: "Empowering Professionals. Transforming Careers.",
      background: "bg-gradient-to-r from-indigo-900 to-blue-900",
      icon: TrendingUp
    },
    {
      title: "Global Talent Development",
      subtitle: "Connecting Talent. Delivering Excellence.",
      background: "bg-gradient-to-r from-gray-900 to-black",
      icon: Globe
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const router = useRouter();

  return (
    <div className="relative w-full h-48 md:h-56 overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            type: "tween",
            duration: 0.3
          }}
          className={`absolute inset-0 flex items-center ${slides[currentSlide].background} text-white`}
        >
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  {React.createElement(slides[currentSlide].icon, {
                    size: 40, 
                    className: "mr-4 text-white/80"
                  })}
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {slides[currentSlide].title}
                  </h2>
                </div>
                <p className="text-lg md:text-xl font-medium text-white/80 tracking-wide">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </div>
            <div className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/career')}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSlider;