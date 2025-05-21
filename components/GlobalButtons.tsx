import Link from 'next/link'
import React from 'react'

const GlobalButtons: React.FC = () => {
  return (
    <div className='flex mb-4'>
      <Link href='/speakToOurCounselor'>
      <button className='px-[5px] py-2 bg-white border border-gray-300 rounded-xl'>
        Talk to Career Expert
      </button></Link>
      <Link href='/contact-us'>
      <button className='mx-2 px-[5px] py-2 bg-blue-600 text-white border border-gray-300 rounded-xl hover:bg-white hover:text-blue-600'>
        Get Free Career Counselling
      </button></Link>
    </div>
  )
}

export default GlobalButtons