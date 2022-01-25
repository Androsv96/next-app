import Head from 'next/head';
import AllPost from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-utils';

function AllPostPage({ posts }) {
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta
          name="decription"
          content="A list of all programming-related tutorials and posts."
        />
      </Head>
      <AllPost posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostPage;
