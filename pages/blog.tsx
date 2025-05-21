import Link from 'next/link';
import { posts } from '../lib/post';
import Layout from '../components/Layout';
import { NextSeo } from 'next-seo';
import Image from '../components/Image';
import Head from 'next/head';

// Define an interface for the post structure
interface Post {
  slug: string;
  title: string;
  content: {
    description: string;
    subtopics: { title: string; description: string; }[];
  };
  image?: string; // Optional image property
}

const BlogList = () => {
  const defaultImage = 'https://placementinstitute.com/bg3.png';

  return (
    <Layout>
      <NextSeo
        title="Career Launchpad Blog - Insights on Skill Development"
        description="Explore the Career Launchpad blog for valuable insights, tips, and resources on online skill development. Stay updated with our latest articles."
        openGraph={{
          title: 'Career Launchpad Blog - Insights on Skill Development',
          description: 'Explore the Career Launchpad blog for valuable insights, tips, and resources on online skill development. Stay updated with our latest articles.',
          images: [
            {
              url: 'https://placementinstitute.com/bg3.png',
              width: 800,
              height: 600,
              alt: 'Career Launchpad Blog',
            },
          ],
          url: 'https://placementinstitute.com/blog',
          type: 'website',
        }}
      />

      <Head>
        <title>Career Launchpad - blog</title>
        <link rel="canonical" href="https://placementinstitute.com/blog" />
        <meta
          name="description"
          content="Welcome to Career Launchpad, your source for online skill development our programs."
        />
        <meta property="og:title" content="Career Launchpad - blog" />
        <meta
          property="og:description"
          content="Welcome to Career Launchpad, your source for online skill development our programs."
        />
        <meta
          property="og:image"
          content="https://placementinstitute.com/bg3.png"
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta
          property="og:url"
          content="https://placementinstitute.com/blog"
        />
      </Head>

      <div className="p-4 bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post: Post) => (
            <div key={post.slug} className="bg-white rounded-lg shadow-lg w-fit">
              <Link href={`/blog/${post.slug}`} passHref>
                <div className="block">
                  <div className="relative">
                    <Image
                      src={post.image || defaultImage}
                      alt={post.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <button className='bg-black text-white rounded-xl p-2 w-full'>Read More</button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogList;