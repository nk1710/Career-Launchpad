export interface CourseData {
  id: string;
  title: string;
  typedTitles: string[];
  highlightPoints: string[];
  heroTitle: string;
  heroSubtitle: string;
  imageSrc: string;
  price: number;
  originalPrice: number;
  discount: string;
  duration: string;
  contentHours: string;
  description: string;
  learningPoints: string[];
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  canonicalUrl: string;
}

const coursesData: Record<string, CourseData> = {
  "frontend-development": {
    id: "1",
    title: "Frontend Development",
    typedTitles: ["Front-End Development Certification with Project"],
    highlightPoints: [
      "Custom Learning for Your Career Goals",
      "Guest Lectures from Industry Experts",
      "Focused Interview and Job Placement Assistance"
    ],
    heroTitle: "Frontend Development",
    heroSubtitle: "HTML, CSS & JavaScript with projects",
    imageSrc: "/full.png",
    price: 3999,
    originalPrice: 5999,
    discount: "17% OFF",
    duration: "3 Months",
    contentHours: "40 hours",
    description: "Our project-based frontend development course takes you from beginner to job-ready developer. Master HTML, CSS, and JavaScript by building real-world projects like landing pages, interactive websites, and web applications. Learn responsive design principles, modern CSS frameworks, and essential developer tools.",
    learningPoints: [
      "HTML5 semantic markup",
      "Modern CSS & animations",
      "JavaScript fundamentals",
      "Responsive design",
      "Web accessibility",
      "Version control with Git"
    ],
    seoTitle: "Frontend Development Courses - Career Launchpad",
    seoDescription: "Join Career Launchpad to explore the best web development courses. Learn front-end and back-end technologies to build powerful websites and applications.",
    ogTitle: "Best Web Development Courses - Career Launchpad",
    ogDescription: "Join Career Launchpad to explore the best web development courses. Learn front-end and back-end technologies to build powerful websites and applications.",
    ogImageUrl: "https://www.placementinstitute.com/bg3.png",
    canonicalUrl: "https://placementinstitute.com/Frontend-development"
  },
  
  "react-development": {
    id: "2",
    title: "React Development",
    typedTitles: ["React Js Certification with Project"],
    highlightPoints: [
      "Custom Learning for Your Career Goals",
      "Guest Lectures from Industry Experts",
      "Focused Interview and Job Placement Assistance"
    ],
    heroTitle: "React JS Development",
    heroSubtitle: "Modern web applications with React & Redux",
    imageSrc: "/full.png",
    price: 4999,
    originalPrice: 7999,
    discount: "38% OFF",
    duration: "3 Months",
    contentHours: "60 hours",
    description: "Become a professional React developer through our comprehensive, project-based course. Learn to build modern, high-performance web applications using React 18, Redux Toolkit, React Router, and essential frontend tools. Gain hands-on experience by creating real-world applications from scratch to deployment.",
    learningPoints: [
      "React 18 fundamentals",
      "Redux state management",
      "React Router",
      "Custom hooks",
      "API integration",
      "Performance optimization",
      "Testing with Jest",
      "NextJS basics"
    ],
    seoTitle: "React Development Courses - Career Launchpad",
    seoDescription: "Master the complete React Development with Career Launchpad's MERN courses. Learn MongoDB, Express, React, and Node.js to build modern web applications.",
    ogTitle: "Best React Development Courses - Career Launchpad",
    ogDescription: "Master the complete React Development with Career Launchpad's  courses. Learn MongoDB, Express, React, and Node.js to build modern web applications.",
    ogImageUrl: "https://www.placementinstitute.com/bg3.png",
    canonicalUrl: "https://placementinstitute.com/fullstack-development"
  },
  
  "laravel-development": {
    id: "3",
    title: "Laravel Development",
    typedTitles: ["PHP Laravel Certification with Projects"],
    highlightPoints: [
    "Custom Learning for Your Career Goals",
      "Guest Lectures from Industry Experts",
      "Focused Interview and Job Placement Assistance"
    ],
    heroTitle: "PHP + Laravel Development",
    heroSubtitle: "Backend mastery with modern PHP frameworks",
    imageSrc: "/Laravel.jpg",
    price: 4999,
    originalPrice: 7999,
    discount: "38% OFF",
    duration: "3 Months",
    contentHours: "60 hours",
    description: " Unlock the power of PHP and Laravel in this comprehensive course. Learn to build robust, scalable web applications using modern development practices. From authentication systems to RESTful APIs, master the complete Laravel ecosystem while creating production-ready projects that will impress employers and clients.",
    learningPoints: [
      "Modern PHP 8 features",
      "Laravel framework", 
      "Eloquent ORM", 
      "API development", 
      "Authentication & security", 
      "Database migrations", 
      "Blade templating", 
      "Testing & deployment"
    ],
    seoTitle: "Best Laravel-PHP Development Courses - Career Launchpad",
    seoDescription: "Master Laravel PHP development at Career Launchpad with hands-on projects. Learn to build dynamic web applications and boost your career in full-stack development.",
    ogTitle: "Best Laravel-PHP Development Courses - Career Launchpad",
    ogDescription: "Master Laravel PHP development at Career Launchpad with hands-on projects. Learn to build dynamic web applications and boost your career in full-stack development.",
    ogImageUrl: "https://www.placementinstitute.com/bg3.png",
    canonicalUrl: "https://placementinstitute.com/Laravel-development"
  },

  "corejava + DSA": {
    id: "4",
    title: "Core Java + DSA Programming",
    typedTitles: ["Core Java Certification with DSA"],
    highlightPoints: [
      "Custom Learning for Your Career Goals",
      "Guest Lectures from Industry Experts",
      "Focused Interview and Job Placement Assistance"
    ],
    heroTitle: "CoreJava + DSA Programming",
    heroSubtitle: "Master Java programming and essential data structures & algorithms",
    imageSrc: "/Java.jpg",
    price: 3999,
    originalPrice: 5999,
    discount: "17% OFF",
    duration: "3 Months",
    contentHours: "60 hours",
    description: "Jumpstart your programming career with our comprehensive Core Java and DSA course. Learn object-oriented programming principles, essential data structures, and efficient algorithms that are crucial for technical interviews and real-world software development. From basic Java syntax to advanced problem-solving techniques, this course covers everything you need to excel as a Java developer.",
    learningPoints: [
      "Java fundamentals", 
      "OOP concepts", 
      "Arrays & Strings", 
      "Linked Lists", 
      "Trees & Graphs", 
      "Sorting algorithms", 
      "Dynamic programming", 
      "Interview preparation"
    ],
    seoTitle: "CoreJava + DSA Programming - Career Launchpad",
    seoDescription: "Master Data Structures and Algorithms with Career Launchpad best DSA courses. Join us to enhance your programming skills and boost your career.",
    ogTitle: "CoreJava + DSA Programming - Career Launchpad",
    ogDescription: "Master Data Structures and Algorithms with Career Launchpad best DSA courses. Join us to enhance your programming skills and boost your career.",
    ogImageUrl: "https://www.placementinstitute.com/bg3.png",
    canonicalUrl: "https://placementinstitute.com/Corejava"
  },

  "C Programming + DSA": {
    id: "5",
    title: "C Programming + DSA ",
    typedTitles: ["C Programming + DSA Certification with project"],
    highlightPoints: [
      "Custom Learning for Your Career Goals",
      "Guest Lectures from Industry Experts",
      "Focused Interview and Job Placement Assistance"
    ],
    heroTitle: "C Programming + DSA",
    heroSubtitle: "Master fundamental programming with C and essential algorithms",
    imageSrc: "/Java.jpg",
    price: 3999,
    originalPrice: 5999,
    discount: "17% OFF",
    duration: "5 Months",
    contentHours: "60 hours",
    description: "Master the fundamentals of computer programming with our comprehensive C Programming and DSA course. Learn memory management, pointers, data structures, and efficient algorithms that form the backbone of all software development. From console applications to system utilities, this course will prepare you with the skills needed for low-level programming and technical interviews.",
    learningPoints: [
      "C fundamentals", 
      "Pointers & memory", 
      "Arrays & structures", 
      "Linked Lists", 
      "Stacks & Queues", 
      "Search algorithms", 
      "File handling", 
      "System programming"
    ],
    seoTitle: "C Programming + DSA Certification - Career Launchpad",
    seoDescription: "Master Data Structures and Algorithms with Career Launchpad best  Programming & DSA courses. Join us to enhance your programming skills and boost your career.",
    ogTitle: "C Programming + DSA Certification course - Career Launchpad",
    ogDescription: "Master  C Programming and DSA Course with Career Launchpad best DSA courses. Join us to enhance your programming skills and boost your career.",
    ogImageUrl: "https://www.placementinstitute.com/bg3.png",
    canonicalUrl: "https://placementinstitute.com/C-DSA"
  },

  "Mern-stack development": {
    id: "6",
    title: "Mern-Stack Development",
    typedTitles: ["Mern-stack Certification with Projects"],
    highlightPoints: [
    "Custom Learning for Your Career Goals",
      "Guest Lectures from Industry Experts",
      "Focused Interview and Job Placement Assistance"
    ],
    heroTitle: "Mern-Stack Development",
    heroSubtitle: "MongoDB, Express, React & Node.js with projects",
    imageSrc: "/Mern.jpg",
    price: 6999,
    originalPrice: 9999,
    discount: "30% OFF",
    duration: "6 Months",
    contentHours: "60 hours",
    description: " Our comprehensive MERN stack course covers everything you need to become a full-stack developer. Build powerful web applications using MongoDB, Express.js, React, and Node.js. Learn to create RESTful APIs, implement authentication, deploy to the cloud, and develop complete end-to-end solutions that will set you apart in the job market.",
    learningPoints: [
     "MongoDB & Mongoose", 
     "Express.js backends", 
     "React frontend", 
     "Node.js development", 
     "JWT authentication", 
     "RESTful API design", 
     "State management", 
     "Cloud deployment"
    ],
    seoTitle: "Mern-stack Development Courses - Career Launchpad",
    seoDescription: "Master MERN Stack development at Career Launchpad with hands-on projects. Learn to build powerful full-stack web applications using MongoDB, Express, React, and Node.js, and accelerate your career in modern web development.",
    ogTitle: "Mern-stack Development Courses - Career Launchpad",
    ogDescription: "Master MERN Stack development at Career Launchpad with hands-on projects. Learn to build powerful full-stack web applications using MongoDB, Express, React, and Node.js, and accelerate your career in modern web development.",
    ogImageUrl: "https://www.placementinstitute.com/bg3.png",
    canonicalUrl: "https://placementinstitute.com/Mern-stack"
  },

  "Advanced-Java": {
    id: "7",
    title: "Advanced Java Certification",
    typedTitles: ["Advanced-Java Certification with DSA"],
    highlightPoints: [
    "Custom Learning for Your Career Goals",
      "Guest Lectures from Industry Experts",
      "Focused Interview and Job Placement Assistance"
    ],
    heroTitle: "Advanced Java + DSA",
    heroSubtitle: "Master enterprise Java development with advanced algorithms and data structures",
    imageSrc: "/Advanced-Java.jpg",
    price: 5999,
    originalPrice: 8999,
    discount: "38% OFF",
    duration: "5 Months",
    contentHours: "60 hours",
    description: " Take your Java skills to the next level with our Advanced Java and DSA certification course. Master multithreading, design patterns, enterprise frameworks, advanced algorithms, and complex data structures essential for building scalable enterprise applications. This course prepares you for both senior developer roles and technical interviews at top tech companies.",
    learningPoints: [
     "Multithreading & concurrency", 
     "Spring & Spring Boot", 
     "Microservices architecture", 
     "Advanced collections", 
     "JVM internals", 
     "Design patterns", 
     "Graph algorithms", 
     "Performance optimization"
    ],
    seoTitle: "Advanced Java Course with DSA - Career Launchpad",
    seoDescription: "Master Advanced Java with DSA at Career Launchpad through hands-on projects. Learn to build efficient applications, strengthen your data structures and algorithms skills, and boost your career in software development.",
    ogTitle: "Advanced Java Course with DSA- Career Launchpad",
    ogDescription: "Master Advanced Java with DSA at Career Launchpad through hands-on projects. Learn to build efficient applications, strengthen your data structures and algorithms skills, and boost your career in software development.",
    ogImageUrl: "https://www.placementinstitute.com/bg3.png",
    canonicalUrl: "https://placementinstitute.com/Advanced-Java"
  },

  "C++ Programming + DSA": {
    id: "8",
    title: "C++ Programming + DSA Certification ",
    typedTitles: ["C++ Programming + DSA Certification Course"],
    highlightPoints: [
      "Custom Learning for Your Career Goals",
      "Guest Lectures from Industry Experts",
      "Focused Interview and Job Placement Assistance"
    ],
    heroTitle: "C++ Programming + DSA",
    heroSubtitle: "Master object-oriented programming with C++ and essential algorithms",
    imageSrc: "/C++.jpg",
    price: 3999,
    originalPrice: 5999,
    discount: "33% OFF",
    duration: "3 Months",
    contentHours: "60 hours",
    description: "Master object-oriented programming with our comprehensive C++ Programming and Data Structures & Algorithms course. Learn powerful language features including classes, templates, STL, memory management, and efficient algorithms essential for modern software development. From console applications to high-performance systems, this course will prepare you with the skills needed for commercial software development and technical interviews.",
    learningPoints: [
      "C++ fundamentals", 
      "Classes & OOP", 
      "STL & templates", 
      "Linked Lists", 
      "Trees & Graphs", 
      "Search algorithms", 
      "Memory management", 
      "High-performance coding"
    ],
    seoTitle: "C++ Programming + DSA Certification - Career Launchpad",
    seoDescription: "Master Data Structures and Algorithms with C++ at Career Launchpad's best Programming & DSA courses. Join us to enhance your programming skills and boost your career.",
    ogTitle: "C++ Programming + DSA Certification - Career Launchpad",
    ogDescription: "Master Data Structures and Algorithms with C++ at Career Launchpad's best Programming & DSA courses. Join us to enhance your programming skills and boost your career.",
    ogImageUrl: "https://www.placementinstitute.com/bg3.png",
    canonicalUrl: "https://placementinstitute.com/Programming-DSA"
  },

  "Advanced-SQL": {
    id: "9",
    title: "Advanced SQL Course",
typedTitles: ["Advanced SQL Certification Course"],
highlightPoints: [
  "Real-world Database Project Experience",
  "Performance Optimization Techniques",
  "Enterprise-level Data Management Skills"
],
heroTitle: "Advanced SQL",
heroSubtitle: "Master complex database management and query optimization techniques",
imageSrc: "/SQL.jpg",
price: 3999,
originalPrice: 4999,
discount: "40% OFF",
duration: "3 Months",
contentHours: "40 hours",
description: "Elevate your database management skills with our Advanced SQL course. Move beyond basics to master complex queries, database design, performance tuning, and enterprise-level data management. Learn how to design efficient schemas, write optimized queries, implement transactions, and secure database systems. Whether you're building data warehouses, managing business intelligence solutions, or developing data-driven applications, this course provides the in-depth SQL expertise needed in today's data-centric world.",
learningPoints: [
  "Complex joins & subqueries", 
  "Stored procedures & triggers", 
  "Transaction management", 
  "Performance optimization", 
  "Window functions", 
  "Database security", 
  "Views & indexing", 
  "Data warehousing concepts"
],
seoTitle: "Advanced SQL Course - Database Management Certification - Career Launchpad",
seoDescription: "Master advanced SQL techniques for database optimization, complex queries, and enterprise data management with Career Launchpad's comprehensive SQL certification course.",
ogTitle: "Advanced SQL Database Mastery Course - Career Launchpad",
ogDescription: "Elevate your career with expert-level SQL skills. Learn complex queries, performance optimization, and enterprise database management techniques for today's data-driven industries.",
ogImageUrl: "https://www.placementinstitute.com/bg3.png",
canonicalUrl: "https://placementinstitute.com/AdvancedSQL"
  },

  "Full-stack": {
    id: "10",
title: "Java Full Stack Development",
typedTitles: ["Complete Full Stack Development Program"],
highlightPoints: [
  "Comprehensive Learning Path from Basics to Advanced",
  "Real-world Project Portfolio Development",
  "Direct Industry Placement Support"
],
heroTitle: "Java Full Stack Development",
heroSubtitle: "Master Java programming from fundamentals to enterprise applications with DSA expertise",
imageSrc: "/Java.jpg",
price: 9999,
originalPrice: 12999,
discount: "30% OFF",
duration: "6 Months",
contentHours: "180 hours",
description: "Transform your career with our comprehensive Java Full Stack Development program. This all-inclusive package covers the complete Java ecosystem - from core fundamentals to advanced enterprise frameworks and critical data structures & algorithms. Begin with Java basics and OOP concepts, then progress to advanced topics including Spring Boot, Hibernate, REST APIs, and microservices architecture. Develop strong problem-solving abilities through intensive DSA training that prepares you for technical interviews at top companies. Graduate with a robust portfolio of real-world projects and the confidence to tackle enterprise-level software development challenges.",
learningPoints: [
  "Core Java & OOP", 
  "Advanced Java & JEE", 
  "Spring Framework ecosystem", 
  "Data Structures & Algorithms", 
  "Database & JDBC", 
  "Hibernate & JPA", 
  "RESTful web services", 
  "Microservices architecture"
],
seoTitle: "Java Full Stack Development Program with DSA - Career Launchpad",
seoDescription: "Master Java development from basics to advanced concepts including Spring, Hibernate and Data Structures & Algorithms. Complete certification program with placement assistance.",
ogTitle: "Complete Java Full Stack Development Program - Career Launchpad",
ogDescription: "Comprehensive Java training covering Core Java, Advanced Java frameworks, and DSA. Build enterprise applications and boost your career with our industry-aligned curriculum.",
ogImageUrl: "https://www.placementinstitute.com/bg3.png",
canonicalUrl: "https://placementinstitute.com/Complete-Full-stack"
  }, 

};

export default coursesData;