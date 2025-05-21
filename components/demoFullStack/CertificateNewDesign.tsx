import React from 'react';
import Image from '../Image';

const DigitalMarketingAdvancedCertificate: React.FC = () => {
  return (
    <div className="bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Advanced Digital Marketing Course by Career Launchpad
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Course Description */}
          <div className="text-white">
            <p className="mb-4">
              Elevate your career in the digital world by enrolling in the Advanced Digital Marketing course. This course is designed for professionals and aspiring marketers who want to master the latest digital marketing techniques and strategies.
            </p>
            <p className="mb-4">
              Our comprehensive online training covers everything from advanced SEO, SEM, content marketing, social media strategies, and email marketing, to the latest trends in digital analytics and automation tools.
            </p>
            <p className="mb-4">
              Learn from industry experts who bring real-world experience to the table. Through hands-on projects, practical assignments, and case studies, you&apos;ll gain the skills and confidence to execute effective digital marketing campaigns that drive results.
            </p>
            <p className="mb-4">
              This course will help you stay ahead of the curve in the fast-paced digital landscape, ensuring you&apos;re equipped with the knowledge to optimize your online presence, increase conversions, and build a strong digital brand.
            </p>
            <p className="mb-4">
              Upon successful completion of the course, you&apos;ll receive a certification from Career Launchpad, recognized as a leader in digital marketing education. Plus, we offer job assistance to help you land a role in the digital marketing field.
            </p>
            <p className="mb-4">
              Whether you&apos;re looking to upskill or change careers, this Advanced Digital Marketing course is the perfect next step to achieve your goals.
            </p>
          </div>

          {/* Certificate Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
             src="/website Banner 3.jpg"
             alt="Certificate of Completion"
             className="rounded-lg shadow-lg"
             width={600}
             height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingAdvancedCertificate;
