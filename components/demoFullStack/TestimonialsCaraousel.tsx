import React from 'react';
import Slider from 'react-slick';
import Image from '../../components/Image';

const testimonials = [
  {
    name: 'Atul Kumar',
    role: 'Student',
    image: '/AtulKumar.jpg',
    text: "The 'Career Launchpad' digital marketing course was a gamechanger for me. The curriculum is well-organized, and the practical assignments provided real-life experience. I was able to apply what I learned immediately, and within a few months, I saw a significant boost in my company’s online presence and sales. The insights and strategies I gained were invaluable. If you’re looking to elevate your digital marketing skills, this course is the way to go!",
    rating: 4,
  },
  {
    name: 'Himanshu Saraswat',
    role: 'Student',
    image: '/HimanshuSarswat.jpg',
    text: "Before joining the 'Career Launchpad' program, I felt overwhelmed by the complexity of full stack development. The structured approach and hands-on projects really made a difference. The course covered everything from front-end basics to advanced backend techniques, and the real-world scenarios prepared me for the job market. I landed my dream job as a full stack developer just a few weeks after completing the course. Highly recommend it!",
    rating: 4,
  },
  {
    name: 'Garima Garg',
    role: 'Student',
    image: '/GarimaGarg.jpg',
    text: "Joining 'Career Launchpad' was one of the best decisions I’ve made for my career. The course’s comprehensive coverage of development, from HTML and CSS to complex server-side programming, gave me a deep understanding of the field. The instructors were knowledgeable and supportive, and the community of peers was incredibly motivating. I now feel confident working on complex projects and have already started freelancing successfully.",
    rating: 5,
  },
  {
    name: 'Mohan Goyal',
    role: 'Student',
    image: '/MohanGoyal.jpg',
    rating: 5,
    text: 'Before joining the ‘Career Launchpad’ program, I felt overwhelmed by the complexity of full stack development. The structured approach and hands-on projects really made a difference. The course covered everything from front-end basics to advanced back-end techniques, and the real-world scenarios prepared me for the job market. I landed my dream job as a full stack developer just a few weeks after completing the course. Highly recommend it!',
  },
];

const TestimonialsCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-green-50 py-6">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">Testimonials</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div className="bg-white p-8 rounded-lg shadow-md h-80 flex flex-col justify-between">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width="96"
                    height="96"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 overflow-hidden overflow-ellipsis h-24">
                  {testimonial.text}
                </p>
                <div className="mt-4 flex">
                  {Array(testimonial.rating)
                    .fill('')
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.478 4.56a1 1 0 00.95.69h4.794c.969 0 1.372 1.24.588 1.81l-3.874 2.83a1 1 0 00-.364 1.118l1.478 4.56c.3.921-.755 1.688-1.538 1.118l-3.874-2.83a1 1 0 00-1.175 0l-3.874 2.83c-.783.57-1.837-.197-1.538-1.118l1.478-4.56a1 1 0 00-.364-1.118L2.37 9.987c-.784-.57-.38-1.81.588-1.81h4.794a1 1 0 00.95-.69l1.478-4.56z" />
                      </svg>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
