// components/SiteMap.tsx
import React from 'react';
import Link from 'next/link';

const SiteMap: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Site Map</h3>
      <ul>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-full-stack-development" className="text-gray-700 hover:text-gray-900">Full Stack Development</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-web-development" className="text-gray-700 hover:text-gray-900">Web Development</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-app-development" className="text-gray-700 hover:text-gray-900">App Development</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-dsa" className="text-gray-700 hover:text-gray-900">DSA</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-mern-dsa" className="text-gray-700 hover:text-gray-900">MERN DSA</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-app-dsa" className="text-gray-700 hover:text-gray-900">App DSA</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-mern-app" className="text-gray-700 hover:text-gray-900">MERN App</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-mern-app-dsa" className="text-gray-700 hover:text-gray-900">MERN App DSA</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-digital-marketing" className="text-gray-700 hover:text-gray-900">Digital Marketing</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-digital-marketing-basic" className="text-gray-700 hover:text-gray-900">Digital Marketing Basic</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="/best-digital-marketing-advanced" className="text-gray-700 hover:text-gray-900">Digital Marketing Advanced</Link>
        </li>
        {/* <li className="mb-2 hover:scale-125">
          <Link href="/contact-us" className="text-gray-700 hover:text-gray-900">Contact Us</Link>
        </li> */}
        <li className="mb-2 hover:scale-125">
          <Link href="https://www.instagram.com/placementinstitute/" className="text-gray-700 hover:text-gray-900">Instagram</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="https://www.facebook.com/placementinstitute/" className="text-gray-700 hover:text-gray-900">Facebook</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="https://x.com/placementinstitute" className="text-gray-700 hover:text-gray-900">X (formerly Twitter)</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="https://www.linkedin.com/company/placement-institute/about/" className="text-gray-700 hover:text-gray-900">LinkedIn</Link>
        </li>
        <li className="mb-2 hover:scale-125">
          <Link href="https://www.youtube.com/@placementinstitute" className="text-gray-700 hover:text-gray-900">YouTube</Link>
        </li>
        {/* <li className="mb-2 hover:scale-125">
          <Link href="/privacy-policy" className="text-gray-700 hover:text-gray-900">Privacy Policy</Link>
        </li> */}
        {/* <li className="mb-2 hover:scale-125">
          <Link href="/terms-conditions" className="text-gray-700 hover:text-gray-900">Terms And Conditions</Link>
        </li> */}
        <li className="mb-2 hover:scale-125">
          <Link href="/faq" className="text-gray-700 hover:text-gray-900">FAQ</Link>
        </li>
      </ul>
    </div>
  );
};

export default SiteMap;
