
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { 
  Menu, 
  X, 
  ChevronDown,
  User
} from 'lucide-react'

const CustomHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [programsDropdown, setProgramsDropdown] = useState(false)
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const programs = [
    {
      title: 'Diploma & Management',
      href: '/Tourism-management',
      subPrograms: [
        { title: 'Diploma in Tourism Management', href: '/Tourism-management' },
        { title: 'Diploma in Airport Management', href: '/Airport-management' },
        { title: 'Diploma in Hotel Management', href: '/Hotel-management' },
        { title: 'Diploma in Merchant Navy', href: '/Merchant-navy' },
        { title: 'Diploma in Metro Management', href: '/Metro-management' },
      ]
    },
    {
      title: ' Development',
      href: '/Development',
      subPrograms: [
        { title: '(HTML , Css , JS) + Project', href: '/Frontend-development' },
        { title: 'React js + Project', href: '/ReactDevelopment' },
        { title: '(PHP + Laravel) + Project', href: '/Laravel-development' },
        { title: 'MERN Stack + Project', href: '/Mern-stack' }
      ]
    },
    {
      title: 'Programming',
      href: '/Development',
      subPrograms: [
        { title: 'Core java + DSA', href: '/CoreJava' },
        { title: 'C Programming + Project + DSA', href: '/C-DSA' },
        { title: 'Advanced Java + DSA', href: '/Advanced-Java' },
        { title: '(C++) + DSA', href: '/Programming-DSA' },
        { title: 'SQL Advanced', href: '/AdvancedSQL' },
        { title: 'Full Package(Core java + Advanced Java + DSA)', href: '/Complete-Full-stack' }
      ]
    }
    // {
    //   title: 'Digital Marketing',
    //   href: '/best-digital-marketing',
    //   subPrograms: [
    //     { title: 'Digital Marketing Advanced', href: '/best-digital-marketing-advanced' }
    //   ]
    // }

  ]
  const loginButton = (
    <Link 
      href="/login" 
      className="relative mr-3 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full shadow-md overflow-hidden hover:scale-110 transition-all duration-300"
      aria-label="Login"
    >
      <User size={15} strokeWidth={2.5} />
      <div className="absolute w-12 h-1/3 bg-white/30 -rotate-45 -top-4 -left-4 transform hover:translate-x-12 hover:translate-y-12 transition-all duration-700"></div>
    </Link>
  );
  
  const contactDetails = [
    {
      href: "mailto:info@placementinstitute.com",
      src: "/email.png",
      alt: "Email",
      text: "info@placementinstitute.com",
    },
    {
      href: "tel:+919289351444",
      src: "/phone.png",
      alt: "Phone",
      text: "+919289351444",
    },
    {
      href: "https://maps.app.goo.gl/TKvdAskJzXmizb189",
      src: "/location.png",
      alt: "Location",
      text: "2/363 Niranjanpuri Ramghat Rd, Landmark-Kishanpur Tiraha Red light , Aligarh (U.P) , 202001",
    }
  ];

  return (
    <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-12 h-12 mr-3">
            <Image 
              src="/bg2.png"
              alt="Career Launchpad Logo" 
              width={48} 
              height={48} 
              className="object-contain" 
            />
          </div>
          <span className="text-xl font-bold text-gray-800 hover:text-blue-600 transition">
            Career Launchpad
          </span>
        </Link>

        {/* Desktop Navigation - Changed from md: to lg: for better tablet support */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Home
          </Link>
          <Link href="/about-us" className="text-gray-700 hover:text-blue-600 font-medium transition">
            About Us
          </Link>
          
          {/* Programs Dropdown - MODIFIED SECTION */}
          <div 
            className="relative group"
            onMouseEnter={() => setProgramsDropdown(true)}
            onMouseLeave={() => {
              // Add a small delay before closing the dropdown
              setTimeout(() => {
                if (!document.querySelector('.group:hover')) {
                  setProgramsDropdown(false)
                  setActiveSubDropdown(null)
                }
              }, 100)
            }}
          >
            <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition py-2">
              Our Programs
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform ${programsDropdown ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {programsDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-200 min-w-[250px] py-2 z-50">
                {programs.map((program, index) => (
                  <div 
                    key={index} 
                    className="relative"
                    onMouseEnter={() => setActiveSubDropdown(program.title)}
                    onMouseLeave={() => {
                      // Add a small delay before closing the sub-dropdown
                      setTimeout(() => {
                        if (!document.querySelector('.relative:hover')) {
                          setActiveSubDropdown(null)
                        }
                      }, 100)
                    }}
                  >
                    <Link 
                      href={program.href} 
                      className="px-4 py-2 hover:bg-gray-100 font-medium text-gray-700 flex justify-between items-center w-full"
                      onClick={() => {
                        setProgramsDropdown(false)
                        setActiveSubDropdown(null)
                      }}
                    >
                      {program.title}
                      {program.subPrograms.length > 0 && (
                        <ChevronDown size={16} className="ml-2" />
                      )}
                    </Link>
                    
                    {activeSubDropdown === program.title && program.subPrograms.length > 0 && (
                      <div className="absolute top-0 left-full ml-1 bg-white shadow-lg rounded-lg border border-gray-200 min-w-[250px] py-2 z-50">
                        {program.subPrograms.map((subProgram, subIndex) => (
                          <Link 
                            key={subIndex} 
                            href={subProgram.href} 
                            className="px-4 py-2 hover:bg-gray-100 text-gray-700 w-full inline-block"
                            onClick={() => {
                              setProgramsDropdown(false)
                              setActiveSubDropdown(null)
                            }}
                          >
                            {subProgram.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact-us" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Contact Us
          </Link>
        </nav>

        {/* Contact icons and Login button - Changed from md: to lg: */}
        <div className="hidden lg:flex space-x-4">
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition">
            Login
          </Link>

          {contactDetails.map(({ href, src, alt, text }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              {/* Icon Image */}
              <Image
                src={src}
                alt={alt}
                width={24}
                height={24}
                unoptimized
                className="hover:scale-110 transition-transform"
              />

              {/* Hidden Text, Shows on Hover */}
              <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
  bg-gray-800 text-white text-xs px-3 py-2 rounded 
  opacity-0 md:group-hover:opacity-100 transition-opacity z-10 
  whitespace-normal break-words text-center max-w-[220px] shadow-md">
  {text}
</span>

            </a>
          ))}
        </div>

        {/* Tablet/Mobile view actions area */}
        <div className="flex items-center lg:hidden">
        {loginButton}
          
          {/* Mobile Menu Toggle */}
          <button 
          className="text-gray-800"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex items-center">
                <div className="w-12 h-12 mr-3">
                  <Image 
                    src="/bg2.png"
                    alt="Career Launchpad Logo" 
                    width={48} 
                    height={48} 
                    className="object-contain" 
                  />
                </div>
                <span className="text-xl font-bold text-gray-800">
                  Career Launchpad
                </span>
              </Link>
              <button 
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
              >
                <X size={24} className="text-gray-800" />
              </button>
            </div>

            <nav className="space-y-4">
              <Link 
                href="/" 
                className="inline-block py-3 text-lg font-medium text-gray-700 border-b w-full"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                href="/about-us" 
                className="inline-block py-3 text-lg font-medium text-gray-700 border-b w-full"
                onClick={toggleMobileMenu}
              >
                About Us
              </Link>

              {programs.map((program, index) => (
                <div key={index} className="border-b">
                  <button 
                    className="w-full text-left py-3 text-lg font-medium text-gray-700 flex justify-between items-center"
                    onClick={() => setActiveSubDropdown(
                      activeSubDropdown === program.title ? null : program.title
                    )}
                  >
                    {program.title}
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform ${
                        activeSubDropdown === program.title ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {activeSubDropdown === program.title && (
                    <div className="pl-4 space-y-3 pb-3">
                      <Link 
                        href={program.href} 
                        className="inline-block text-gray-600 w-full"
                        onClick={toggleMobileMenu}
                      >
                        {program.title} Overview
                      </Link>
                      {program.subPrograms.map((subProgram, subIndex) => (
                        <Link 
                          key={subIndex} 
                          href={subProgram.href} 
                          className="inline-block text-gray-600 w-full"
                          onClick={toggleMobileMenu}
                        >
                          {subProgram.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link 
                href="/contact-us" 
                className="inline-block py-3 text-lg font-medium text-gray-700 border-b w-full"
                onClick={toggleMobileMenu}
              >
                Contact Us
              </Link>

              <div className="flex justify-center space-x-6 mt-6">
                {contactDetails.map(({ src, alt, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={32}
                      height={32}
                      unoptimized
                    />
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default CustomHeader ;
