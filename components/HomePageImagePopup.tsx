// components/ImagePopup.tsx
import React from 'react';
import Image from '../components/Image'
interface ImagePopupProps {
  imageUrl: string;
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

const HomePageImagePopup: React.FC<ImagePopupProps> = ({ imageUrl, title, description, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleImageClick = () => {
    window.open('https://lms.placementinstitute.com/signup', '_blank');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40 backdrop-blur-sm">
      <div className="relative rounded-lg shadow-lg max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 p-2 text-white bg-black rounded-full hover:bg-gray-300"
        >
          &times;
        </button>
        <a onClick={handleImageClick} className="cursor-pointer">
          <Image src={imageUrl} alt={title} className="w-full rounded-t-lg" />
        </a>
        <div className="p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePageImagePopup;
