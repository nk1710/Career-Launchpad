import React from 'react';
import { NextSeo } from 'next-seo';
import { Phone, Mail, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Link from 'next/link';

// const Image = dynamic(() => import('../components/Image'));
const ContactForm = dynamic(() => import('../components/Contact'));

const ContactUs: React.FC = () => {
  return (
    <Layout>
      <NextSeo
        title="Career Launchpad - Contact Us"
        description="Get in touch with Career Launchpad for inquiries and support. Reach out to us via phone, email, or visit our office."
        openGraph={{
          title: 'Career Launchpad - Contact Us',
          description: 'Get in touch with Career Launchpad for inquiries and support. Reach out to us via phone, email, or visit our office.',
          images: [
            {
              url: 'https://placementinstitute.com/bg2.png',
              width: 800,
              height: 600,
              alt: 'Contact Career Launchpad',
            },
          ],
          url: 'https://placementinstitute.com/contact-us',
        }}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">Contact Us</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Have questions about our services? Need more information? We&apos;re here to help.
            Reach out to us using any of the methods below.
          </p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column: Contact Information and Map */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Phone className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Phone</h3>
                      <p className="text-gray-600">+91 9289351444</p>
                      <p className="text-gray-600">+91 9289489444</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Mail className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Email</h3>
                      <a href="mailto:info@placementinstitute.com" className="text-blue-600 hover:underline">
                        info@placementinstitute.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <MapPin className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Locations</h3>
                      <p className="text-gray-600 mb-4 text-justify ">
                  <Link href="https://maps.app.goo.gl/TKvdAskJzXmizb189" target="_blank" className="hover:text-blue-600 ">

                        <span className="font-medium ">Aligarh:</span> 2/363 Niranjanpuri  Ramghat road aligarh ,
                        Landmark-Kishanpur Tiraha Red light , Aligarh Uttar Pradesh pincode:- 202001
                      </Link>
                      </p>
                      
                      <p className="text-gray-600 text-justify">
                        <span className="font-medium">Bangalore:</span> Ganga Nagar Extension, Manjunatha Layout, 
                        R.T.Nagar, Bangalore, Karnataka, 560032
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3526.2188928957394!2d78.08800047454324!3d27.895255317180318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a4a444530001%3A0x1b404cf49dcc5899!2sPlacement%20Institute%20India%20pvt.Ltd.!5e0!3m2!1sen!2sin!4v1743404065306!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map"
                  className="w-full"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="w-full lg:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container mx-auto px-4 text-center">
          {/* Logo */}
          {/* <div className="">
            <Image
              src="/bg2.png"
              alt="Career Launchpad Logo"
              width={150}
              height={50}
              className="mx-auto"
              unoptimized
              priority={true}
            />
          </div> */}

          {/* <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
            Reach out to us for any queries regarding admissions, courses, or placement opportunities.
            Our team is always ready to assist you in your career journey.
          </p> */}

         {/* Social Media Icons */}

           {/* <div className="flex justify-center space-x-6 mt-6">
           
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
          </div> */}
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
