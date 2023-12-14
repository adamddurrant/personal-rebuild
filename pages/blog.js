import Head from "next/head";
import { request } from "../lib/datocms";
import util from "../styles/util.module.css";
import BlogTile from "../components/tiles/blogTile";
import heroOne from "../public/blogs/hero-1.jpg"

//page header and in-page description
const description = "Here you'll find my most recent writings. I enjoy writing but I need motivation to write more so, this page will keep me accountable. Here you can find search engine optimisaton and web development insight, guides, tools & thoughts.";
const pageTitle = "Adam Durrant | Personal SEO & Web Dev Blog";

export default function Home(props) {
  const { data } = props;
  const posts = data.allPosts;
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
          <div className={util.grid}>
            {posts.map((post, index) => (
              <BlogTile
                key={index}
                image={post.featuredImage}
                title={post.title}
                excerpt={post.excerpt}
                url={post.slug}
              />
            ))}
            <BlogTile
                key={98}
                staticImage={heroOne}
                title={'Six Most Common Travel SEO Mistakes'}
                excerpt={'In-depth guide for all things SEO in the travel industry for 2019. Index bloat, on-site search, 404 pages, meta titles, and more. Common mistakes and fixes.'}
                url={'https://www.searchenginewatch.com/2018/12/14/travel-seo-guide-2019/'}
              />
          </div>
        </div >
      </main >
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
  allPosts(orderBy: publishDate_DESC) {
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
