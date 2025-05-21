import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('../components/Layout'))

const About: React.FC = () => {
  return (
    <Layout>
      <NextSeo
        title="Career Launchpad - Privacy Policy"
        description="Welcome to Career Launchpad, your source for online skill development and our programs."
        openGraph={{
          title: 'Career Launchpad - Privacy Policy',
          description:
            'Welcome to Career Launchpad, your source for online skill development and our programs.',
          images: [
            {
              url: 'https://placementinstitute.com/bg3.png',
              width: 800,
              height: 600,
              alt: 'Placement  Institute  Privacy Policy',
            },
          ],
        }}
      />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 md:p-12 lg:p-16 max-w-4xl w-full rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
            Privacy Policy
          </h1>
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p>
              We at <span className="font-bold">Career Launchpad</span> are dedicated to maintaining a safe learning environment and safeguarding your privacy. This privacy statement describes the methods by which we gather, handle, and protect your data.
            </p>
            <h2 className="text-xl font-semibold mt-4">Information Collection:</h2>
            <p>
              When you register for our programs or get in touch with us, we take personal information such as your name, email address, and phone number. We could also gather data on your comments and learning progress.
            </p>
            <h2 className="text-xl font-semibold mt-4">Information Utilization:</h2>
            <p>
              We utilize the data we gather to provide you with updates, course materials, and assistance. It enables us to better customize our offerings to your requirements and improve the educational process.
            </p>
            <h2 className="text-xl font-semibold mt-4">Data Security:</h2>
            <p>
              To guard against unauthorized access, disclosure, or abuse, we put strong security measures in place. We constantly upgrade our systems to guarantee the greatest degree of security.
            </p>
            <h2 className="text-xl font-semibold mt-4">Disclosure to Third Parties:</h2>
            <p>
              Your personal information is never traded, sold, or otherwise given to unaffiliated third parties. We could divulge information to reliable partners who help us run our website and offer services, but confidentiality agreements bind them.
            </p>
            <h2 className="text-xl font-semibold mt-4">Your Rights:</h2>
            <p>
              You are entitled to see, update, or remove your personal data. Please get in touch with us to use these rights or if you have any questions regarding your data.
            </p>
            <h2 className="text-xl font-semibold mt-4">Policy Changes:</h2>
            <p>
              This Privacy Policy may be updated from time to time by us. We advise you to periodically check our website as any updates will be provided there.
            </p>
            <p>
              You agree to our privacy policies as described in this policy by using Career Launchpad.
            </p>

            <h2 className="text-xl font-semibold mt-8">What information do we collect?</h2>
            <h3 className="text-lg font-semibold mt-4">Personal information you disclose to us</h3>
            <p>
              We collect personal information that you provide to us. This includes when you register on the Services, express interest in obtaining information about us or our products and Services, participate in activities on the Services, or otherwise contact us.
            </p>
            <h3 className="text-lg font-semibold mt-4">Personal Information Provided by You</h3>
            <p>
              The personal information we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
            </p>
            <ul className="list-disc list-inside pl-4">
              <li>Names</li>
              <li>Phone numbers</li>
              <li>Email addresses</li>
              <li>Job titles</li>
              <li>Contact preferences</li>
              <li>Billing addresses</li>
              <li>Usernames</li>
              <li>Passwords</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4">Payment Data</h3>
            <p>
              We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (e.g., credit card number), and the security code associated with your payment instrument. All payment data is stored by Razorpay. You may find their privacy notice link(s) here: <a href="https://razorpay.com/privacy/" className="text-blue-600 underline">https://razorpay.com/privacy/</a>.
            </p>

            <h3 className="text-lg font-semibold mt-4">Information Automatically Collected</h3>
            <p>
              Some information, such as your Internet Protocol (IP) address and/or browser and device characteristics, is collected automatically when you visit our Services. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser type, operating system, and more.
            </p>
            <p>
              The information we collect includes:
            </p>
            <ul className="list-disc list-inside pl-4">
              <li>Log and Usage Data</li>
              <li>Device Data</li>
              <li>Location Data</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8">How do we process your information?</h2>
            <p>
              We process your information to provide, improve, and administer our Services, communicate with you, ensure security, and comply with legal obligations. The specific purposes include:
            </p>
            <ul className="list-disc list-inside pl-4">
              <li>To facilitate account creation and authentication</li>
              <li>To deliver and facilitate delivery of services</li>
              <li>To respond to user inquiries</li>
              <li>To fulfil and manage your orders</li>
              <li>To enable user-to-user communications</li>
              <li>To send you marketing and promotional communications</li>
              <li>To evaluate and improve our Services and your experience</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8">When & with whom do we share your Personal Information?</h2>
            <p>
              We may share information in specific situations, such as business transfers or with business partners to offer you certain products or services.
            </p>

            <h2 className="text-xl font-semibold mt-8">Do we use cookies & other tracking technologies?</h2>
            <p>
              We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific details are set out in our Cookie Notice.
            </p>

            <h2 className="text-xl font-semibold mt-8">How do we keep your Information safe?</h2>
            <p>
              We implement appropriate and reasonable security measures to protect your personal information. However, no system is completely secure, and we cannot guarantee its absolute safety.
            </p>

            <h2 className="text-xl font-semibold mt-8">How do you contact us regarding the privacy policy?</h2>
            <p>
              If you have questions or comments about this notice, you may email us at <a href="mailto:info@placementinstitute.com" className="text-blue-600 underline">info&#64;placementinstitute&#46;com</a> or by post to:
            </p>
            <address className="not-italic">
              1st Floor, A-83<br />
              Sector – 63<br />
              Noida- 201301 <br />
              UP, India
            </address>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
