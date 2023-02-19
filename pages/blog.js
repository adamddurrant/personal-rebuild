import Head from "next/head";
import { getAllPublished } from "../lib/notion";
import util from "../styles/util.module.css";
import BlogTile from "../components/tiles/blogTile";

//page header and in-page description
const description =
  "Here you'll find my most recent writings. I enjoy writing but I need motivation to write more so, this page will keep me accountable. Here you can find search engine optimisaton and web development insight, guides, tools & thoughts.";
const pageTitle = "Adam Durrant | Personal Blog";

export default function Home({ posts }) {
  if (!posts) return <h1>No posts</h1>;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:url' content='https://adamdurrant.co.uk/blog' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={description} />
      </Head>
      <main className={util.page} id='aboutPage'>
        <div className={util.pageColumn}>
          <h1 className={util.header}>Blog</h1>
          <p className={util.description}>{description}</p>
          <ul className={util.grid}>
            {posts.map((post, index) => (
              <BlogTile
                key={index}
                imageUrl={post.hero}
                title={post.title}
                content={post.description}
                url={post.slug}
                tags={post.multi_select}
              />
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
export const getStaticProps = async () => {
  const data = await getAllPublished();
  return {
    props: {
      posts: data,
    },
    revalidate: 60,
  };
};
