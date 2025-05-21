// components/Testimonials.js
import React from 'react';
import Slider from 'react-slick';
import Image from '../components/Image'; // Assuming Image is a valid component

const testimonials = [
  {
    name: 'Ayush Sharma',
    role: 'Student',
    image: '/Ayush.jpg',
    text: "Enrolling in the Airport Management Diploma program at Career Launchpad was one of the best decisions I've made for my career. The instructors are industry experts who provide valuable insights and hands-on experience. The curriculum is well-structured and covers all aspects of airport operations, giving students a comprehensive understanding of the industry. I highly recommend Career Launchpad to anyone looking to pursue a career in airport management.",
    rating: 5,
  },
  {
    name: "Mangesh Kaur",
    role: "Student",
    image: "/Mangesh.jpg",
    text: "Completing the Diploma in Merchant Management at Career Launchpad was a game-changer for my career. The program provided me with the knowledge and skills needed to excel in the dynamic world of merchant management. The faculty members are experienced professionals who offer practical insights and mentorship. The curriculum is up-to-date and relevant, covering key topics such as retail strategy, inventory management, and customer engagement. I am grateful for the opportunity to study at Career Launchpad and highly recommend it to aspiring merchant managers",
    rating: 5,
  },
  // {
  //   name: "Rishav Kumar",
  //   role: "Student",
  //   image: "/Mangesh.jpg",
  //   text: "Completing the Diploma in Merchant Management at Career Launchpad was a game-changer for my career. The program provided me with the knowledge and skills needed to excel in the dynamic world of merchant management. The faculty members are experienced professionals who offer practical insights and mentorship. The curriculum is up-to-date and relevant, covering key topics such as retail strategy, inventory management, and customer engagement. I am grateful for the opportunity to study at Career Launchpad and highly recommend it to aspiring merchant managers",
  //   rating: 5,
  // },
  
];

const Testimonials = () => {
  // Consolidated slider settings to avoid duplication
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-indigo-500 rounded-full mb-4"></div>
          <p className="text-gray-600 text-center max-w-2xl">Discover why our customers love working with us</p>
        </div>
        
        <div className="relative testimonial-slider-container">
          <Slider {...settings} className="testimonial-slider">
            {/* Create an extended array that repeats testimonials to ensure continuous looping */}
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="px-3 py-2">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] h-full flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                        <p className="text-sm text-indigo-600">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        {Array(5).fill('').map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.478 4.56a1 1 0 00.95.69h4.794c.969 0 1.372 1.24.588 1.81l-3.874 2.83a1 1 0 00-.364 1.118l1.478 4.56c.3.921-.755 1.688-1.538 1.118l-3.874-2.83a1 1 0 00-1.175 0l-3.874 2.83c-.783.57-1.837-.197-1.538-1.118l1.478-4.56a1 1 0 00-.364-1.118L2.37 9.987c-.784-.57-.38-1.81.588-1.81h4.794a1 1 0 00.95-.69l1.478-4.56z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{testimonial.rating}.0</span>
                      </div>
                      <div className="relative">
                        <svg className="absolute top-0 left-0 w-8 h-8 text-indigo-100 transform -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="text-gray-700 relative z-10 pt-5 sm:text-base leading-relaxed  mb-3 text-justify ">{testimonial.text}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
      {/* Add this to your CSS file instead of using style jsx */}
      {/* 
      .testimonial-slider .slick-dots li button:before {
        color: #6366F1;
      }
      .testimonial-slider .slick-dots li.slick-active button:before {
        color: #4F46E5;
      }
      .testimonial-slider .slick-prev:before,
      .testimonial-slider .slick-next:before {
        color: #4F46E5;
      }
      */}
    </section>
  );
};

export default Testimonials;