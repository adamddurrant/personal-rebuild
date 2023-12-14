import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { request } from "../../lib/datocms";
import { Image } from "react-datocms"
import util from "../../styles/util.module.css";
import style from "./markdownStyles.module.css";
import { StructuredText } from "react-datocms";
import Head from "next/head";
import Link from "next/link";
// import Image from "next/image";

const CodeBlock = ({ language, codestring }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag='div'>
      {codestring}
    </SyntaxHighlighter>
  );
};
export default function Blogpost(props) {
  const { postData } = props;
  return (
    <>
      <Head>
        {/* <title>{post.metadata.title} | ADurrant</title>
        <meta name='description' content={post.metadata.description} />
        <meta property='og:title' content={post.metadata.title} />
        <meta property='og:description' content={post.metadata.description} />
        <meta name='twitter:title' content={post.metadata.title} />
        <meta name='twitter:description' content={post.metadata.description} /> */}
      </Head>
      <article className={util.page} id='aboutPage'>
        <div className={util.pageColumn}>
          <Image data={postData.featuredImage.responsiveImage} />
          <h1 style={{ marginTop: "20px" }} className={util.blogHeader}>
            {postData.title}
          </h1>
          <div
            className={util.tags + " " + util.flexColumn + " " + util.postMeta}>
            <div
              className={util.flexMeta}
              style={{ justifyContent: "center", alignItems: "center" }}>

              {/* <span className={util.postDate}>{post.metadata.date}</span> */}

              {/* <p className={post.metadata.tags[0].color + "Tag tag"}>
                {post.metadata.tags[0].name}
              </p> */}

            </div>

            <div className={util.flexRow} style={{ marginTop: "30px" }}>
              <div style={{ marginRight: "10px" }}>
                {/* <Image
                  priority
                  width={40}
                  height={40}
                  src='/me/adam-durrant.jpg'
                  alt='Adam Durrant'
                  style={{ borderRadius: "100px" }}
                /> */}
              </div>
              <div className={util.read}>
                <p style={{ margin: "0px", lineHeight: "0.9" }}>Adam Durrant</p>
                <a
                  className={util.tweetLink}
                  style={{ fontSize: "12px" }}
                  href='https://twitter.com/AdamDDurrant'>
                  @adamddurrant
                </a>
              </div>
            </div>
          </div>

          <section class="blog-body">
            <StructuredText data={postData.body}
              renderBlock={({ record }) => {
                switch (record.__typename) {
                  case "ImageRecord":
                    return <Image data={record.image.responsiveImage} />;
                  default:
                    return null;
                }
              }} />
          </section>

        </div>
        <Link scroll={false} href='/blog'>
          <div className={util.buttonPadding}>
            <a className={util.backButton}> ← &nbsp; Back to blog</a>
          </div>
        </Link>
      </article>
    </>
  );
};

const PATHS_QUERY = ` 
query Paths {
  allPosts {
    slug
  }
}
`;

export const getStaticPaths = async () => {
  const slugQuery = await request({
    query: PATHS_QUERY,
  });
  let paths = [];
  slugQuery.allPosts.map((p) => paths.push(`/blog/${p.slug}`));

  return {
    paths,
    fallback: false,
  };
}


const POST_QUERY = ` 
query singlePost($slug: String) {
  post(filter: {slug: {eq: $slug}}) {
    featuredImage {
      url
      title
      responsiveImage {
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
        alt
      }
    }
    category {
      name
    }
    _seoMetaTags {
      content
      tag
      attributes
    }
    slug
    title
    body {
      value
      blocks {
        __typename
        ... on ImageRecord {
          id
          image {
            responsiveImage {
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
              alt
            }
          }
        }
      }
    }
    publishDate
  }
}
`;

export const getStaticProps = async ({ params }) => {
  const postQuery = await request({
    query: POST_QUERY,
    variables: { slug: params.slug },
  });
  return {
    props: {
      postData: postQuery.post,
    },
  };
}