
// components/ContactUs.js
import Image from '../components/Image';

const ContactUs = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/bg2.png"
            alt="Logo"
            className="w-22 h-auto md:w-15 md:h-12"
            width={200}
            height={30}
            priority={true}
            unoptimized
            // Added custom loader
          />
        </div>

        {/* Contact Information */}
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-2">+91 8882199108</p>
        <p className="text-gray-700 mb-2">
          E-mail us at: <span className="text-blue-600 hover:underline">support [at] placementinstitute [dot] com</span>
        </p>

        <p className="text-gray-700 mb-2">
          HQ – A-83, Sector 63 Noida, Uttar Pradesh
        </p>
        <p className="text-gray-700">201301</p>
      </div>
      
    </section>
  );
};

export default ContactUs;