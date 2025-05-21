import type { NextPage } from 'next';
import { FAQ } from '../components/FAQ';
import Layout from '../components/Layout';
import { NextSeo } from 'next-seo';


const FAQPage: NextPage = () => {
  return (
    <Layout>
      <NextSeo
        title="Career Launchpad - faq"
        description="Welcome to Career Launchpad, your source for online skill development our programs."
        openGraph={{
          title: 'Career Launchpad - faq',
          description:
            'Welcome to Career Launchpad, your source for online skill development our programs.',
          images: [
            {
              url: 'https://placementinstitute.com/bg3.png',
              width: 800,
              height: 600,
              alt: 'Career Launchpad faq',
            },
          ],
        }}
      />
      <div>
        <FAQ />
      </div>
    </Layout>
  );
};

export default FAQPage;