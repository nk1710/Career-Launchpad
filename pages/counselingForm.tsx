import React from 'react'
import Layout from '../components/Layout'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

const CounselingForm: React.FC = () => {
  return (
    <Layout>
      <NextSeo
        title="Career Launchpad - counselling"
        description="Welcome to Career Launchpad, your source for online skill development our programs."
        openGraph={{
          title: 'Career Launchpad - counselling',
          description:
            'Welcome to Career Launchpad, your source for online skill development our programs.',
          images: [
            {
              url: 'https://placementinstitute.com/bg3.png',
              width: 800,
              height: 600,
              alt: 'Career Launchpad counselling',
            },
          ],
        }}
      />

      <Head>
        <title>Career Launchpad - counsellingForm </title>
        <link rel="canonical" href="https://placementinstitute.com/counselingForm" />
        <meta
          name="description"
          content="Welcome to Career Launchpad, your source for online skill development our programs."
        />
        <meta property="og:title" content="Career Launchpad - counsellingForm" />
        <meta
          property="og:description"
          content="Welcome to Career Launchpad , your source for online skill development our programs."
        />
        <meta
          property="og:image"
          content="https://placementinstitute.com/bg3.png"
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta
          property="og:url"
          content="https://placementinstitute.com/counselingForm"
        />
        {/* Add other meta tags as needed */}

      </Head>

      <div className='flex items-center justify-center min-h-screen bg-gray-100 p-6'>
        <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
          <h1 className='text-2xl font-semibold mb-6 text-gray-800'>Counseling Form</h1>
          <form className='space-y-6'>
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-2'>Full Name</label>
              <input type="text" className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500' placeholder='Enter full name' />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-2'>Contact Number</label>
              <input type="text" className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500' placeholder='Enter contact number' />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-2'>Email</label>
              <input type="email" className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500' placeholder='Enter your email' />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-2'>Select Your Course</label>
              <select className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500' >
                <option value="fullstack">Full Stack Development</option>
                <option value="marketing">Digital Marketing</option>
              </select>
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-2'>Book Your Appointment</label>
              <input type="date" className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500' />
            </div>
            <div className='flex justify-center'>
              <button type="submit" className='w-full bg-orange-400 text-white p-3 rounded-md shadow-md hover:bg-orange-700' >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default CounselingForm