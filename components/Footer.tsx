import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from './Image'

const Footer: React.FC = () => {
  // Expandable sections for mobile view
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  // State to track if we're on client-side
  const [isMounted, setIsMounted] = useState(false);
  // State for tracking window width
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Effect runs only on client-side after component mounts
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const otherLinks = [
    { href: "/about-us", label: "About us" },
    { href: "/career", label: "Career" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
    { href: "/contact-us", label: "Contact us" },
  ]

  const popularCourses = [
    { href: "/Merchant-navy", label: "Diploma in Merchant Navy" },
    { href: "/Metro-management", label: "Diploma in Metro Management" },
    { href: "/Hotel-management", label: "Diploma in Hotel Management" },
    { href: "/Tourism-management", label: "Diploma in Tourism Management" },
    { href: "/Airport-management", label: "Diploma in Airport Management" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institute Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image 
                src="/bg2.png" 
                alt="Career Launchpad Logo" 
                width={50} 
                height={50}
                className="mr-3"
              />
              <h3 className="text-lg font-bold text-gray-900">Career Launchpad</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Shaping tomorrow&apos;s leaders with excellence in education and professional training.
            </p>
            {/* <div className="mt-4 flex space-x-4 &apos;">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div> */}
          </div>

          {/* Quick Links - Collapsible on mobile */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default" 
              onClick={() => toggleSection('links')}
            >
              <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>
              <svg 
                className={`w-4 h-4 transition-transform md:hidden ${expandedSection === 'links' ? 'transform rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
            <ul className={`mt-4 space-y-2 overflow-hidden transition-all duration-300 ${(expandedSection === 'links' || isDesktop || !isMounted) ? 'max-h-96' : 'max-h-0 md:max-h-96'}`}>
              {otherLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-blue-600 transition flex items-center"
                  >
                    <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses - Collapsible on mobile */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default" 
              onClick={() => toggleSection('courses')}
            >
              <h3 className="text-lg font-bold text-gray-900">Popular Courses</h3>
              <svg 
                className={`w-4 h-4 transition-transform md:hidden ${expandedSection === 'courses' ? 'transform rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
            <ul className={`mt-4 space-y-2 overflow-hidden transition-all duration-300 ${(expandedSection === 'courses' || isDesktop || !isMounted) ? 'max-h-96' : 'max-h-0 md:max-h-96'}`}>
              {popularCourses.map((course, index) => (
                <li key={index}>
                  <Link
                    href={course.href}
                    className="text-sm text-gray-700 hover:text-blue-600 transition flex items-center"
                  >
                    <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.851 1.22v6.911l7-3V7.692l7-3a1 1 0 000-1.84l-7-3z"></path>
                    </svg>
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information - Collapsible on mobile */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default" 
              onClick={() => toggleSection('contact')}
            >
              <h3 className="text-lg font-bold text-gray-900">Contact Us</h3>
              <svg 
                className={`w-4 h-4 transition-transform md:hidden ${expandedSection === 'contact' ? 'transform rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div className={`mt-4 overflow-hidden transition-all duration-300 ${(expandedSection === 'contact' || isDesktop || !isMounted) ? 'max-h-96' : 'max-h-0 md:max-h-96'}`}>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div className="text-sm text-gray-700">
                  <Link href="" target="_blank" className="hover:text-blue-600 ">

                    <p className="font-medium">Aligarh Office:</p>
                    <p className=' text-justify' >2/*** */ Sultanpur ,
                    Landmark-Kishanpur Tiraha Red light , Aligarh Uttar Pradesh pincode:- 202001</p>
                    </Link>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">Bangalore Office:</p>
                    <p className='  text-justify'> Bangalore, Karnataka - ******</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div className="text-sm text-gray-700">
                    <p>+91 6388992862 | +91 6388992862</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div className="text-sm text-gray-700">
                    <Link href="" className="hover:text-blue-600">info@**************com</Link><br />
                    <Link href="" className="hover:text-blue-600">Admission@***********.com</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Credentials bar */}
      <div className="bg-gray-800 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="text-xs md:text-sm text-center md:flex md:justify-between md:items-center">
            <p>Approved by: ACT Government of India, NCT, MSME & MCA</p>
            <p className="mt-2 md:mt-0">Director: Ms. Kajal Rajput</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Copyright© 2025, All rights reserved | Career Launchpad India Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer ;