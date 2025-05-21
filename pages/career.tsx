import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';


interface CourseCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

// type TestimonialProps = {
//   quote: string;
//   author: string;
//   role: string;
//   image?: string;
// };

type FeatureBoxProps = {
  title: string;
  description: string;
  icon: string;
};

// Define the course category type
type CourseCategory = 'maritime' | 'transportation' | 'hospitality' | 'it';

// Dynamically import Layout
const Layout = dynamic(() => import('../components/Layout'));

// Custom components
const CourseCard = ({ title, description, icon, color, path }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`relative overflow-hidden rounded-xl shadow-lg p-6 ${color} text-white`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 opacity-10 text-6xl p-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="sm:text-base leading-relaxed text-gray-100 mb-3 text-justify">{description}</p>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
        className="flex justify-between items-center"
      >
       <Link href={path}>
  <span className="font-bold hover:text-gray-200 cursor-pointer">
    Learn more →
  </span>
</Link>
      </motion.div>
    </motion.div>
  );
};

const FeatureBox = ({ title, description, icon }: FeatureBoxProps) => (
  <motion.div 
    className="bg-white rounded-lg shadow-md p-6"
    whileHover={{ y: -5 }}
  >
    <div className="text-blue-600 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="sm:text-base leading-relaxed text-gray-800 mb-3 text-justify">{description}</p>
  </motion.div>
);

// const Testimonial = ({ quote, author, role, image }:TestimonialProps) => (
//   <motion.div 
//     className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-md"
//     whileHover={{ scale: 1.02 }}
//   >
//     <div className="flex items-start mb-4">
//       <div className="text-4xl text-blue-400 mr-3"></div>
//       <p className="italic text-gray-700">{quote}</p>
//     </div>
//     <div className="flex items-center">
//       <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 mr-4">
//         {image ? <Image src={image} alt={author} width={48} height={48} className="w-full h-full object-cover" /> : null}
//       </div>
//       <div>
//         <p className="font-bold">{author}</p>
//         <p className="text-sm text-gray-600">{role}</p>
//       </div>
//     </div>
//   </motion.div>
// );

const CareerPage = () => {
  const [activeTab, setActiveTab] = useState<CourseCategory>('maritime');
  const [animateHero, setAnimateHero] = useState(false);
  
  useEffect(() => {
    setAnimateHero(true);
  }, []);

  const courseCategories = {
    maritime: [
      {
        title: "Diploma in Merchant Navy",
        description: "Launch your maritime career with our comprehensive program covering navigation, maritime law, and shipboard operations.",
        icon: "⚓",
        color: "bg-gradient-to-r from-blue-600 to-blue-800",
        path: "/Merchant-navy"
      }
    ],
    transportation: [
      {
        title: "Diploma in Metro Management",
        description: "Master urban transit operations, safety protocols, and management systems for the rapidly growing metro rail sector.",
        icon: "🚇",
        color: "bg-gradient-to-r from-purple-600 to-purple-800",
        path: "/Metro-management"
      },
      {
        title: "Diploma in Airport Management",
        description: "Learn airport operations, passenger services, and aviation safety to excel in the dynamic aviation industry.",
        icon: "✈️",
        color: "bg-gradient-to-r from-indigo-600 to-indigo-800",
        path: "/Airport-management"
      }
    ],
    hospitality: [
      {
        title: "Diploma in Hotel Management",
        description: "Develop expertise in accommodation, food & beverage, and hospitality management practices for a successful hotel career.",
        icon: "🏨",
        color: "bg-gradient-to-r from-red-600 to-red-800",
        path: "/Hotel-management"
      },
      {
        title: "Diploma in Tourism Management",
        description: "Explore tourism economics, destination management, and customer service to thrive in the global tourism sector.",
        icon: "🗺️",
        color: "bg-gradient-to-r from-green-600 to-green-800",
        path: "/Tourism-management"
      }
    ],
    it: [
      // {
      //   title: "IT Courses (Coming Soon)",
      //   description: "Prepare for the future with our upcoming IT programs focused on in-demand tech skills and practical knowledge.",
      //   icon: "💻",
      //   color: "bg-gradient-to-r from-gray-600 to-gray-800",
      //   path: "/IT-courses"
      // },
      {
        title: "Development Courses",
        description: "Learn the latest programming languages and frameworks to kickstart your career in software development.", 
        icon: "📈",
        color: "bg-gradient-to-r from-yellow-600 to-yellow-800",
        path: "/Development"
      },
      {
        title: "Programming Languages",
        description: "Master essential programming languages like Python, Java, and C++ to build a strong foundation in software development.",
        icon: "💻",
        color: "bg-gradient-to-r from-orange-600 to-orange-800",
        path: "/Programming-DSA"
      }
    ]
  };

  return (
    <Layout>
      <NextSeo
        title="Career Programs | Career Launchpad"
        description="Discover specialized diploma programs in Merchant Navy, Metro Management, Hotel Management, Tourism, Airport Management, and upcoming IT courses at Career Launchpad."
        openGraph={{
          title: 'Career Programs | Career Launchpad',
          description: 'Discover specialized diploma programs in Merchant Navy, Metro Management, Hotel Management, Tourism, Airport Management, and upcoming IT courses at Career Launchpad.',
          images: [
            {
              url: 'https://placementinstitute.com/images/career-programs.jpg',
              width: 1200,
              height: 630,
              alt: 'Career Launchpad Career Programs',
            },
          ],
        }}
      />

      <Head>
        <title>Career Programs | Career Launchpad</title>
        <link rel="canonical" href="https://placementinstitute.com/career" />
        <meta name="description" content="Discover specialized diploma programs in Merchant Navy, Metro Management, Hotel Management, Tourism, Airport Management, and upcoming IT courses at Career Launchpad." />
      </Head>

      {/* Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={animateHero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
              Shape Your Future with<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                Specialized Career Programs
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8 text-blue-100">
              Industry-focused diplomas designed to prepare you for rewarding careers in high-demand sectors
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={animateHero ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
            <Link href="/Development">
      <button className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:shadow-lg transform transition hover:scale-105 mr-4">
        Explore Programs
      </button>
    </Link>
              {/* <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-900 transform transition hover:scale-105">
                Request Brochure
              </button> */}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated Wave */}
        <svg className="absolute bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,128L48,112C96,96,192,64,288,64C384,64,480,96,576,101.3C672,107,768,85,864,80C960,75,1056,85,1152,90.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* Course Categories */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specialized Programs</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our diploma programs are crafted with industry expertise to provide you with the skills and knowledge needed to excel in your chosen field.
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-10">
            <button 
              className={`m-2 px-6 py-2 rounded-full font-medium transition ${activeTab === 'maritime' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('maritime')}
            >
              Maritime
            </button>
            <button 
              className={`m-2 px-6 py-2 rounded-full font-medium transition ${activeTab === 'transportation' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('transportation')}
            >
              Transportation
            </button>
            <button 
              className={`m-2 px-6 py-2 rounded-full font-medium transition ${activeTab === 'hospitality' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('hospitality')}
            >
              Hospitality & Tourism
            </button>
            <button 
              className={`m-2 px-6 py-2 rounded-full font-medium transition ${activeTab === 'it' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('it')}
            >
              IT (Coming Soon)
            </button>
          </div>
          
          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseCategories[activeTab].map((course, index) => (
              <CourseCard 
                key={index} 
                title={course.title} 
                description={course.description} 
                icon={course.icon} 
                color={course.color} 
                path={course.path}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureBox 
              title="Industry-Connected Faculty" 
              description="Learn from instructors with extensive practical experience who bring real-world insights into the classroom."
              icon="👨‍🏫"
            />
            <FeatureBox 
              title="Hands-on Training" 
              description="Gain practical experience through simulations and industry visits that complement theoretical learning."
              icon="🛠️"
            />
            <FeatureBox 
              title="Placement Assistance" 
              description="Benefit from our strong industry connections and dedicated placement cell to kickstart your career."
              icon="🤝"
            />
            <FeatureBox 
              title="Flexible Learning Options" 
              description="Choose from online, offline, or hybrid learning modes that suit your schedule and preferences."
              icon="📱"
            />
            <FeatureBox 
              title="Comprehensive Curriculum" 
              description="Study meticulously designed courses that cover both fundamental concepts and emerging industry trends."
              icon="📚"
            />
            <FeatureBox 
              title="Global Recognition" 
              description="Earn diplomas that are recognized by leading organizations across the globe for their quality and relevance."
              icon="🌎"
            />
          </div>
        </div>
      </section>

      {/* Learning Experience */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Career Launchpad Experience</h2>
              <p className="text-lg text-gray-700 mb-6 sm:text-base leading-relaxed text-justify">
                We&apos;ve created a unique learning environment where you can develop both technical skills and professional capabilities needed in today&apos;s competitive job market.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Interactive Classes</h3>
                    <p className="text-gray-600 sm:text-base leading-relaxed text-justify">
                      Engage in dynamic classroom sessions with case studies, group discussions, and problem-solving activities.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Recorded Lectures</h3>
                    <p className="text-gray-600 sm:text-base leading-relaxed text-justify">
                      Access your classes anytime, anywhere with our comprehensive library of recorded sessions.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Doubt Clearing Sessions</h3>
                    <p className="text-gray-600 sm:text-base leading-relaxed text-justify">
                      Get personalized attention through regular doubt clearing sessions with faculty experts.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                    04
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Industry Projects</h3>
                    <p className="text-gray-600 sm:text-base leading-relaxed text-justify">
                      Apply your learning to real-world scenarios through carefully designed industry projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
  <Image 
    src="/I1.jpg" 
    alt="Students learning in modern classroom" 
    width={600}
    height={400}
    className="w-full h-auto"
  />
</div>
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-blue-200 rounded-full opacity-50 z-0"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-200 rounded-full opacity-50 z-0"></div>
            </div>
          </div>
        </div>
      </section>
   {/* Upcoming IT Courses */}
<section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
  <div className="max-w-6xl mx-auto px-4">
    <div className="text-center mb-12">
      <span className="inline-block px-4 py-1 rounded-full bg-blue-500 text-white text-sm font-medium mb-4">Coming Soon</span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Introducing IT Career Programs</h2>
      <p className="text-blue-100 max-w-3xl mx-auto">
        Expanding our offerings to meet the growing demand for IT professionals. Master industry-standard technologies and languages with our practical, career-focused IT courses.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <motion.div 
        className="bg-gradient-to-br from-blue-800 to-blue-700 p-6 rounded-lg text-center"
        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="text-4xl mb-4">💻</div>
        <h3 className="text-xl font-bold mb-2">Full Stack Development</h3>
        <p className="text-blue-100">Comprehensive training in both frontend and backend technologies</p>
      </motion.div>
      
      <motion.div 
        className="bg-gradient-to-br from-purple-800 to-purple-700 p-6 rounded-lg text-center"
        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="text-4xl mb-4">☕</div>
        <h3 className="text-xl font-bold mb-2">Java Programming</h3>
        <p className="text-purple-100">Master core Java concepts and enterprise application development</p>
      </motion.div>
      
      <motion.div 
        className="bg-gradient-to-br from-indigo-800 to-indigo-700 p-6 rounded-lg text-center"
        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="text-4xl mb-4">🌐</div>
        <h3 className="text-xl font-bold mb-2">HTML & CSS</h3>
        <p className="text-indigo-100">Learn to create responsive, modern websites with industry best practices</p>
      </motion.div>
      
      <motion.div 
        className="bg-gradient-to-br from-pink-800 to-pink-700 p-6 rounded-lg text-center"
        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="text-4xl mb-4">⚛️</div>
        <h3 className="text-xl font-bold mb-2">JavaScript & React</h3>
        <p className="text-pink-100">Build interactive web applications with JavaScript and React framework</p>
      </motion.div>
    </div>
    
    {/* <div className="text-center mt-10">
      <button className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:shadow-lg transform transition hover:scale-105">
        Join Waitlist
      </button>
    </div> */}
  </div>
</section>
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our programs and admission process
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">What are the eligibility criteria for your diploma programs?</h3>
              <p className="text-gray-600 sm:text-base leading-relaxed text-justify">
                Most of our diploma programs require a minimum qualification of 10+2 from a recognized board. Specific programs may have additional requirements which are mentioned on their respective course pages.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">Do you provide placement assistance after course completion?</h3>
              <p className="text-gray-600 sm:text-base leading-relaxed text-justify">
                Yes, we have a dedicated placement cell that works with industry partners to provide placement assistance to all our students. Our placement record has consistently been above 90% for most programs.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">Can I attend classes online or is physical attendance mandatory?</h3>
              <p className="text-gray-600 sm:text-base leading-relaxed text-justify">
                We offer flexible learning options including online, offline, and hybrid modes. You can choose the mode that suits your requirements best. However, certain practical modules may require physical attendance.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">When will the IT courses be launched?</h3>
              <p className="text-gray-600 sm:text-base leading-relaxed text-justify">
                Our IT courses are scheduled to be launched in the next academic session. You can join the waitlist to be notified when admissions open and to receive early-bird benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Query Section */}
      <section> 
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 py-5  text-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Have any queries?
    </h2>
    <p className="mb-6 text-lg text-white/90">
      Get in touch with our counselors for personalized guidance.
    </p>
    <Link href="/contact-us">
           <button className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:shadow-lg transform transition hover:scale-105 mr-4">

        Contact Us
      </button>
    </Link>
  </div>
  </div>
</section>

    </Layout>
  );
};

export default CareerPage;