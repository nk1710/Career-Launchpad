import React from 'react';
import Image from '../Image';

const DigitalMarketingCourse: React.FC = () => {
  return (
    <div className="bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Skill-Oriented Online Digital Marketing Basic Course By Career Launchpad
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Course Description */}
          <div className="text-white">
            <p className="mb-4">
              In the digital age, mastering digital marketing is crucial for any business or individual aiming to build a strong online presence. The Digital Marketing Basic course offers a comprehensive introduction to key digital marketing strategies and tools that can help you achieve your marketing goals.
            </p>
            <p className="mb-4">
              This course covers essential aspects of digital marketing, including SEO, content marketing, social media, email marketing, and more. By understanding these core areas, you&lsquo;ll be equipped to create effective marketing campaigns and drive significant results for any business.
            </p>
            <p className="mb-4">
              Enroll in our online Digital Marketing Basic course with WsCube Tech to gain foundational skills and practical knowledge. Our training is designed to be hands-on, with real-world projects that will help you apply what you learn and build a strong portfolio.
            </p>
            <p className="mb-4">
              The course includes expert-led sessions, certification upon completion, and job assistance to help you start your career in digital marketing. Whether you are a beginner or looking to refine your skills, this course provides everything you need to succeed.
            </p>
            <p className="mb-4">
              Learn the basics of digital marketing and gain the expertise needed to enhance your online presence and career opportunities. Join us and become proficient in the dynamic field of digital marketing.
            </p>
          </div>

          {/* Certificate Image */}
          <div className="flex justify-center lg:justify-end">
              <Image
               src="/CertificateDosso21.jpg"
                alt="Certificate of Completion"
                className="rounded-lg shadow-lg"
                width={250}
                height={250}
                unoptimized
                priority={true}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingCourse;
