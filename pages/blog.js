import Head from "next/head";
import { getAllPublished } from "../lib/notion";
import { request } from "../lib/datocms";
import util from "../styles/util.module.css";
import BlogTile from "../components/tiles/blogTile";

//page header and in-page description
const description =
  "Here you'll find my most recent writings. I enjoy writing but I need motivation to write more so, this page will keep me accountable. Here you can find search engine optimisaton and web development insight, guides, tools & thoughts.";
const pageTitle = "Adam Durrant | Personal Blog";

export default function Home( props ) {
  const { data } = props;
  const posts = data.allPosts;
  console.log(posts);
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:url' content='https://adamdurrant.co.uk/blog' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={description} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={description} />
      </Head>
      <main className={util.page} id='aboutPage'>
        <div className={util.pageColumn}>
          <h1 className={util.header}>Blog</h1>
          <p className={util.description}>{description}</p>
          <ul className={util.grid}>
            {posts.map((post, index) => (
              <BlogTile
                key={index}
                image={post.featuredImage}
                title={post.title}
                excerpt={post.excerpt}
                url={post.slug}
              />
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const data = await request({
    query: POSTS_QUERY
  });
  return {
    props: {
     data 
    },
  };
}

const POSTS_QUERY = ` 
query Posts {
  allPosts(orderBy: publishDate_ASC) {
    title
    slug
    featuredImage {
      responsiveImage {
        alt
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
      }
    }
    excerpt
  }
}
`;
