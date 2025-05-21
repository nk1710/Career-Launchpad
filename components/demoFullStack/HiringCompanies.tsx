// import React from 'react';
// import Slider from 'react-slick';
// import Image from '../Image';

// const companies = [
//   { name: 'Hitachi', logo: '/hitachi.jpeg' },
//   { name: 'Bosch', logo: '/bosch.jpeg' },
//   { name: 'Adobe', logo: '/adob.jpeg' },
//   { name: 'Facebook', logo: '/face.png' },
//   { name: 'IBM', logo: '/ibm1.png' },
//   { name: 'Intel', logo: '/intel.jpeg' },
//   { name: 'Samsung', logo: '/samsung.jpeg' },
//   { name: 'EY', logo: '/ey.jpeg' },
//   { name: 'Infosys', logo: '/infosys.jpeg' },
//   { name: 'Wenger & Watson', logo: '/wenger.jpeg' },
//   { name: 'BookMyShow', logo: '/Book.jpeg' },
//   { name: 'Venmo', logo: '/venmo.jpeg' },
//   { name: 'Wisemonk', logo: '/wise.jpeg' },
//   { name: 'CarDekho', logo: '/car.jpeg' },
//   { name: 'Qualcomm', logo: '/qualcomm.jpeg' },
//   { name: 'LTI', logo: '/lti.jpeg' },
//   { name: 'Mindtree', logo: '/mindtree.jpeg' },
//   { name: 'Autodesk', logo: '/autodesk.jpeg' },
//   { name: 'Tech Mahindra', logo: '/techmahindra.jpeg' },
//   { name: 'Cognizant', logo: '/cognizant.jpeg' },
//   { name: 'Microsoft', logo: '/microsoft.jpeg' },
//   { name: 'Amazon', logo: '/amazon.jpeg' },
//   { name: 'Tata Motor', logo: '/tata.jpeg' },
//   { name: 'Cisco', logo: '/cisco.jpeg' },
//   { name: 'Dell', logo: '/dell.jpeg' },
//   { name: 'Simens', logo: '/simens.jpeg' },
//   { name: 'Toyota', logo: '/toyota.jpeg' },
//   { name: 'Honeywell', logo: '/honeywell.jpeg' },
//   { name: 'ABB', logo: '/abb.jpeg' },
//   { name: 'IKEA', logo: '/ikea.jpeg' },
//   { name: 'Volkswagen', logo: '/volks.jpg' },
//   { name: 'Oracle', logo: '/oracle.jpeg' },
//   { name: 'BMW', logo: '/bmw.jpeg' },
//   { name: 'Ford', logo: '/ford.jpeg' },
//   { name: 'Cococola', logo: '/coc.jpeg' },
//   { name: 'Pepsi', logo: '/pepsi.jpeg' },
//   { name: 'Alibaba', logo: '/alibaba.jpeg' },
//   { name: 'Huwai', logo: '/huwai.jpeg' },
//   { name: 'Intut', logo: '/intut.jpeg' },
//   { name: 'PWC', logo: '/pwc.jpeg' },
//   { name: 'LAVA', logo: '/lava.jpeg' },
//   { name: 'Accenture', logo: '/accent.jpeg' },
//   { name: 'Walmart', logo: '/walmart.jpeg' },
//   { name: 'HCL', logo: '/hcl.jpeg' },
//   { name: 'Tech Mahindra', logo: '/tech1.jpeg' },
//   { name: 'LG', logo: '/lg.jpeg' },
//   { name: 'HP', logo: '/hp.jpeg' },

// ];


// const HiringCompanies: React.FC = () => {

//   const settings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 5,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           dots: false,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bg-white py-12">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
//           Top Companies Hiring in India
//         </h2>
//         <Slider {...settings} className="slick-slider">
//           {companies.map((company, index) => (
//             <div key={index} className="p-2">
//               <div className="flex justify-center items-center">
//                 <Image
//                   src={company.logo}
//                   alt={company.name}
//                   width={200}
//                   height={200}
//                   className="h-20 object-contain"
//                 />
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default HiringCompanies;

"use client";

import { motion } from "framer-motion";

const ApprovalMarquee: React.FC = () => {
  return (
    <div className="bg-gray-100 py-3 overflow-hidden whitespace-nowrap border-t border-b border-gray-300">
      <motion.div
        className="text-lg md:text-xl font-medium text-gray-700 flex"
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }} // Slower speed
      >
        {[...Array(5)].map((_, i) => (
        <span key={i}  className="mr-16 ">
          ✅ Approved by ACT Government of India, NCT (National Capital Territory), MSME 
          (Ministry of Micro, Small & Medium Enterprises), and MCA (Ministry of Corporate Affairs)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         
        </span>
         ))}
      </motion.div>
    </div>
  );
};

export default ApprovalMarquee;
