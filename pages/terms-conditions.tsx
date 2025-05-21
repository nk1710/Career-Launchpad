import { NextSeo } from 'next-seo'
import Layout from '../components/Layout'
import {
  Clock,
  Book,
  Award,
  Briefcase,
  CreditCard,
  Shield,
  Server,
  MessageSquare,
} from 'lucide-react'

const TermsConditions: React.FC = () => {
  return (
    <Layout>
      <NextSeo
        title="Career Launchpad - Terms & Conditions"
        description="Read the terms and conditions for Career Launchpad's online diploma programs, IT courses, and job placement services."
        openGraph={{
          title: 'Career Launchpad - Terms & Conditions',
          description:
            'Read the terms and conditions for Career Launchpad&apos;s online diploma programs, IT courses, and job placement services.',
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50   ">
        <div className=" mx-auto">
          {/* Header Card */}
          <div className="bg-[url('/t&c.jpg')] bg-cover bg-center h-96   shadow-2xl overflow-hidden items-center justify-center flex flex-col">
            <div className="relative px-8 py-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-20 -mb-10"></div>

              <h1 className="text-5xl  md:text-6xl font-bold text-indigo-700 text-center relative z-10 hover: color-gray-100 transition duration-300 ease-in-out cursor-pointer">
                Terms & Conditions
              </h1>
              <p className="text-gray-100 text-center mt-4 max-w-2xl mx-auto relative z-10 font-medium">
                Please review our comprehensive terms for online education,
                certification, and placement services
              </p>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white  shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-10 max-w-7xl mx-auto    ">
            <div className="p-8 md:p-12">
              <div className="space-y-10 text-gray-700">
                {/* Section 1 */}
                <div className="flex flex-col md:flex-row gap-6 hover:scale-105 transition-transform duration-300 border rounded-lg p-6 bg-white shadow-md ">
                  <div className="flex-shrink-0 flex items-start pt-1">
                    <div className="bg-indigo-200 p-3 rounded-lg">
                      <Book className="w-6 h-6 text-indigo-800" />
                    </div>
                  </div>
                  <div >
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">Online Program Enrollment & Access</h2>
                    <p className=" text-gray-700 sm:text-base leading-relaxed text-justify mb-4">
                      By enrolling in Career Launchpad&apos;s online diploma programs and IT courses, you gain access to our recorded classes, learning materials, and assessments for the duration specified in your enrollment package. This access is personal and non-transferable.
                    </p>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify">
                      Students are responsible for maintaining adequate internet connectivity and compatible devices to access course content. Career Launchpad is not liable for technical difficulties on the student&apos;s end that may hinder course completion.
                    </p>
                  </div>
                </div>
              

                {/* Section 2 */}
                <div className="flex flex-col md:flex-row gap-6  hover:scale-105 transition-transform duration-300 border rounded-lg p-6 bg-white shadow-md ">
                  <div className="flex-shrink-0 flex items-start pt-1">
                    <div className="bg-indigo-200 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-indigo-800" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                      Course Completion Requirements
                    </h2>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify mb-4">
                      Students must complete all modules, assignments, and
                      assessments within the timeframe specified for each
                      course. Certification and placement eligibility are
                      contingent upon successful course completion with a
                      minimum passing grade of 70%.
                    </p>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify">
                      While our recorded classes offer flexibility, students
                      must adhere to assignment deadlines and complete the
                      program within the maximum allowable timeframe (typically
                      1.5x the standard course duration).
                    </p>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col md:flex-row gap-6  hover:scale-105 transition-transform duration-300 border rounded-lg p-6 bg-white shadow-md">
                  <div className="flex-shrink-0 flex items-start pt-1">
                    <div className="bg-indigo-200 p-3 rounded-lg">
                      <Award className="w-6 h-6 text-indigo-800" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                      Certification Process
                    </h2>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify mb-4">
                      Career Launchpad awards certificates upon successful
                      completion of course requirements. Our certificates verify
                      skill acquisition but are not equivalent to university
                      degrees or government-accredited qualifications unless
                      explicitly stated for specific programs.
                    </p>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify">
                      Certificate authenticity can be verified through our
                      online portal. Any attempt to falsify or modify
                      certificates will result in immediate termination of all
                      Institute services and potential legal action.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="flex flex-col md:flex-row gap-6  hover:scale-105 transition-transform duration-300 border rounded-lg p-6 bg-white shadow-md">
                  <div className="flex-shrink-0 flex items-start pt-1">
                    <div className="bg-indigo-200 p-3 rounded-lg">
                      <Briefcase className="w-6 h-6 text-indigo-800" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                      Placement Services & Limitations
                    </h2>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify mb-4">
                      For eligible graduates, our placement services include
                      resume enhancement, interview preparation, and direct
                      connections with our industry partners. Placement
                      assistance is available for 6 months following successful
                      course completion.
                    </p>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify">
                      While we maintain relationships with numerous employers,
                      Career Launchpad cannot guarantee job placement as
                      final hiring decisions rest with employers and depend on
                      market conditions, your interview performance, and
                      qualifications. Students must actively participate in all
                      placement-related activities and respond promptly to
                      opportunity notifications.
                    </p>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="flex flex-col md:flex-row gap-6  hover:scale-105 transition-transform duration-300 border rounded-lg p-6 bg-white shadow-md">
                  <div className="flex-shrink-0 flex items-start pt-1">
                    <div className="bg-indigo-200 p-3 rounded-lg">
                      <CreditCard className="w-6 h-6 text-indigo-800" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                      Payment Terms & Refund Policy
                    </h2>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify mb-4">
                      Course fees must be paid as per the selected payment plan
                      prior to accessing course content. For installment plans,
                      missed payments may result in temporary suspension of
                      course access until the account is current.
                    </p>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify">
                      A 7-day cooling-off period applies from enrollment, during
                      which you may cancel for a full refund if no course
                      content has been accessed. Beyond this period, or once
                      course materials have been accessed, no refunds will be
                      provided. Course transfers to alternative programs may be
                      available subject to administrative fees.
                    </p>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="flex flex-col md:flex-row gap-6  hover:scale-105 transition-transform duration-300 border rounded-lg p-6 bg-white shadow-md">
                  <div className="flex-shrink-0 flex items-start pt-1">
                    <div className="bg-indigo-200 p-3 rounded-lg">
                      <Shield className="w-6 h-6 text-indigo-700" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                      Intellectual Property & Course Materials
                    </h2>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify mb-4">
                      All course materials, including recorded lectures,
                      presentations, assessments, and supplementary resources,
                      are the intellectual property of Career Launchpad and
                      protected by copyright laws.
                    </p>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify">
                      Students are prohibited from sharing access credentials,
                      downloading (except where explicitly permitted),
                      redistributing, or selling course materials. Violation of
                      these terms will result in immediate account termination
                      without refund and potential legal action.
                    </p>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="flex flex-col md:flex-row gap-6  hover:scale-105 transition-transform duration-300 border rounded-lg p-6 bg-white shadow-md">
                  <div className="flex-shrink-0 flex items-start pt-1">
                    <div className="bg-indigo-200 p-3 rounded-lg">
                      <Server className="w-6 h-6 text-indigo-800" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                      Platform Availability & Updates
                    </h2>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify mb-4">
                      Career Launchpad strives to maintain 99% platform
                      uptime but is not liable for temporary service
                      interruptions due to maintenance, technical issues, or
                      factors beyond our control. Scheduled maintenance will be
                      announced at least 24 hours in advance.
                    </p>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify">
                      We continually update our course content to reflect
                      industry changes and enhance learning experiences. These
                      updates may occur during your enrollment period and are
                      considered a benefit of our service rather than a
                      modification of terms.
                    </p>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="flex flex-col md:flex-row gap-6  hover:scale-105 transition-transform duration-300 border rounded-lg p-6 bg-white shadow-md">
                  <div className="flex-shrink-0 flex items-start pt-1">
                    <div className="bg-indigo-200 p-3 rounded-lg">
                      <MessageSquare className="w-6 h-6 text-indigo-700" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-700 mb-3">
                      Communication & Support
                    </h2>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify mb-4">
                      Students agree to maintain professional communication with
                      Institute staff, instructors, and fellow students in all
                      interactions. Support requests will be addressed within 48
                      business hours through our designated support channels.
                    </p>
                    <p className="text-gray-700 sm:text-base leading-relaxed text-justify">
                      By enrolling, you consent to receive important
                      notifications regarding your course, updates, and
                      placement opportunities. You may opt out of marketing
                      communications while maintaining essential course-related
                      notifications.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acceptance Notice */}
              <div className="mt-12 pt-6 border-t border-gray-300 ">
                <div className="bg-indigo-200 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                  <p className="text-indigo-800 text-center font-bold hover:text-indigo-700 ">
                    By Enrolling in any program offered by Career Launchpad,
                    you acknowledge that you have read, understood, and agree to
                    abide by these terms and conditions. Your continued use of
                    our platform constitutes acceptance of these terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-indigo-800 font-small flex justify-center items-center gap-2">
            <p>Last Updated: April 2025</p>
            <span className="block w-2 h-2 rounded-full bg-indigo-800"></span>
            <p>Career Launchpad Inc.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TermsConditions
