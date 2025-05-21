import Image from '../components/Image'
import { useRouter } from 'next/router';

const CertificateComponent: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  // Define content for different course pages
  const courseContent = {
    // Frontend Development Course
    '/Frontend-development': {
      title: "Frontend Development Certificate",
      description: "Get Frontend Development Certified by Career Launchpad and showcase your UI/UX skills to potential employers",
      benefits: ["Master HTML, CSS & JavaScript", "Build responsive web interfaces", "Create interactive user experiences"],
      ctaText: "Start Learning..",
      ctaLink: "/login",
      imagePath: "/Certificate.png",
      imageAlt: "Frontend Development Certificate"
    },
    // React Development Course
    '/ReactDevelopment': {
      title: "React Development Certificate",
      description: "Become a certified React Developer and build modern, dynamic single-page applications",
      benefits: ["Component-based architecture", "State management expertise", "React ecosystem mastery"],
      ctaText: "Start Learning..",
      ctaLink: "/login",
      imagePath: "/Certificate.png",
      imageAlt: "React Development Certificate"
    },
    // Laravel Development Course
    '/Laravel-development': {
      title: "PHP Laravel Development Certificate",
      description: "Learn PHP with the Laravel framework and build powerful web applications with real-world projects.",
      benefits: [
        "Master MVC architecture with Laravel",
        "Build RESTful APIs and dynamic web apps",
        "Hands-on projects with real-world use cases"
      ],
      ctaText: "Start Learning..",
      ctaLink: "/login",
      imagePath: "/Certificate.png",
      imageAlt: "PHP Laravel Development Certificate"
    },
     // C Programming And DSA Course
     '/CoreJava': {
      title: "Core Java & DSA with Projects",
      description: "Build a strong foundation in Core Java and Data Structures with practical, project-based learning.",
      benefits: [
        "Comprehensive Core Java concepts",
        "Master Data Structures & Algorithms (DSA)",
        "Apply skills through real-world Java projects"
      ],
      ctaText: "Start Learning..",
      ctaLink: "/login",
      imagePath: "/Certificate.png",
      imageAlt: "Core Java and DSA with Projects"
      
    },
    // C Programming And DSA Course
    '/C-DSA': {
      title: "C Programming & DSA with Projects",
      description: "Master C Programming and Data Structures with real-world projects to build strong programming fundamentals.",
      benefits: [
        "In-depth C programming concepts",
        "Hands-on Data Structures & Algorithms (DSA)",
        "Real-world project-based learning"
      ],
      ctaText: "Start Learning..",
      ctaLink: "/login",
      imagePath: "/Certificate.png",
      imageAlt: "C Programming and DSA with Projects"
      
    },

    '/Advanced-Java': {
      title: "Advanced Java Certification with DSA",
      description: "Master Advanced Java and Data Structures through real-world projects and enterprise-level applications.",
      benefits: [
        "Enterprise-level Java development",
        "Hands-on Data Structures & Algorithms (DSA)",
        "Project-based learning with Spring Boot & Microservices"
        ],
      ctaText: "Start Learning..",
      ctaLink: "/login",
      imagePath: "/Certificate.png",
      imageAlt: "Advanced Java Certification Course with DSA" 
    },


    '/AdvancedSQL': {
      title: "Advanced SQL Certification",
description: "Deep dive into SQL for data analysis and high-performance querying.",
benefits: [
  "Advanced joins & subqueries",
  "Window functions & CTEs",
  "Query optimization techniques"
],
ctaText: "Start Learning..",
ctaLink: "/login",
imagePath: "/Certificate.png",
imageAlt: "Advanced SQL Certification Course"

    },


    '/Mern-stack': {
      title: "MERN Stack Development with Projects",
      description: "Become a full-stack web developer by mastering MongoDB, Express, React, and Node.js through hands-on, project-driven learning.",
      benefits: [
        "Learn full-stack development with MERN",
        "Build scalable web applications from scratch",
        "Hands-on experience with real-world MERN projects"
      ],
      ctaText: "Start Learning..",
      ctaLink: "/login",
      imagePath: "/Certificate.png",
      imageAlt: "MERN Stack Development with Projects"
      
    },
    
    '/C++,DSA': {
      title: "C++ Programming with Data Structures & Algorithms",
description: "Master the fundamentals of C++ and excel in coding interviews by learning core programming concepts along with data structures and algorithms.",
benefits: [
  "Build strong programming foundations with C++",
  "Learn essential data structures and algorithm techniques",
  "Prepare for technical interviews and competitive programming"
],
ctaText: "Start Learning..",
ctaLink: "/login",
imagePath: "/Certificate.png",
imageAlt: "C++ Programming with Data Structures and Algorithms"
      
    },

    '/Complete-Full-stack': {
      title: "Complete Java Mastery: Core Java, Advanced Java & DSA",
      description: "Become a proficient Java developer by mastering Core Java, Advanced Java concepts, and Data Structures & Algorithms in one comprehensive course.",
      benefits: [
        "Learn Core Java fundamentals with hands-on coding",
        "Dive deep into Advanced Java topics like JDBC, Servlets, and JSP",
        "Master Data Structures & Algorithms using Java for coding interviews and problem-solving"
      ],
      ctaText: "Start Learning..",
      ctaLink: "/login",
      imagePath: "/Certificate.png",
      imageAlt: "Complete Java Mastery: Core Java, Advanced Java & DSA"
    }
    // Add more course paths as needed
  };

  // Default content if path doesn't match any known course
  const defaultContent = {
    title: "Certificate of Completion",
    description: "Get Certified by Career Launchpad and share your achievement with the World",
    benefits: ["Earn your Certificate", "Share your Achievement"],
    ctaText: "Start Learning..",
    imagePath: "/Certificate.png",
    imageAlt: "Certificate"
  };

  // Get content for current path or use default
  const content = (courseContent as any)[currentPath] || defaultContent;

  return (
    <div className="bg-gray-800 text-white py-12 px-4 md:px-12 lg:px-24 xl:px-36">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">{content.title}</h1>
          <p className="text-lg mb-4">
            {content.description}
          </p>
          <ul className="list-disc list-inside text-lg space-y-2 mb-6">
            {content.benefits.map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
             ))}
          </ul>
        
            <button className="bg-white text-black py-2 px-6 rounded-full hover:bg-gray-300">
              {content.ctaText}
            </button>
        
        </div>

        {/* Right Section */}
        <div className="md:w-3/4 flex justify-center">
  <div className="relative w-full max-w-4xl">
    <Image
      src={content.imagePath}
      alt={content.imageAlt}
      layout="responsive"
      width={1600} // set a large width (original image size)
      height={1200} // keep the original aspect ratio
      unoptimized // optional: skip Next.js optimization if you want original clarity
      className="rounded-lg shadow-lg"
    />
  </div>
</div>
      </div>
    </div>
  );
};

export default CertificateComponent;