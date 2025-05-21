import { GetStaticPaths, GetStaticProps } from 'next';
import { posts } from '../../lib/post';
import Layout from '../../components/Layout';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map((post) => ({
    params: { slugs: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slugs as string;
  const post = posts.find((post) => post.slug === slug) || null;

  return {
    props: {
      post,
    },
  };
};

const BlogPost = ({ post }: { post: typeof posts[number] | null }) => {
  if (!post) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Post not found</p>
      </div>
    );
  }

  return (
  <Layout>
      <div className="p-4 bg-gray-100 w-full">
      <div className=" mx-auto bg-white rounded-lg shadow-lg w-full">
       
        <div className="p-6 w-full">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-800 leading-relaxed mb-6">{post.content.description}</p>
          <div>
            {post.content.subtopics.map((subtopic, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{subtopic.title}</h2>
                <p className="text-gray-700">{subtopic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default BlogPost;
