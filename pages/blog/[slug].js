import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "../../pages/blog/index.module.css"
import { request } from "../../lib/datocms";
import { Image, renderRule, StructuredText } from "react-datocms"
import util from "../../styles/util.module.css";
import { isCode } from 'datocms-structured-text-utils';
import Head from "next/head";
import Link from "next/link";
import authorImage from "../../public/me/adam-durrant.jpg";

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
      <article className={util.page}>

        <div className={util.pageColumn}>

          <section className={styles.headerGroup}>

            <div className={styles.header}>
              <h1 style={{ marginTop: "20px", textAlign: "left" }} className={util.blogHeader}>
                {postData.title}
              </h1>
              <p className={styles.excerpt}>{postData.excerpt}</p>
            </div>

            <div className={util.flexColumn + " " + styles.metaData}>
              <div className={util.flexRow} style={{ marginTop: "30px" }}>
                <div style={{ marginRight: "10px" }}>
                  <Image data={authorImage} style={{ borderRadius: "100px", width: "40px", height: "40px" }} />
                </div>
                <div className={util.read}>
                  <p style={{ margin: "0px", lineHeight: "0.9", fontWeight: "600" }}>Adam Durrant</p>
                  <a
                    className={util.tweetLink}
                    style={{ fontSize: "12px" }}
                    href='https://twitter.com/AdamDDurrant'>
                    @adamddurrant
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.featuredImage}>
              <Image data={postData.featuredImage.responsiveImage} style={{ borderRadius: "6px" }} />
            </div>

          </section>

          <section className={util.body}>

            <StructuredText data={postData.body}
              renderBlock={({ record }) => {
                switch (record.__typename) {
                  case "ImageRecord":
                    return <Image data={record.image.responsiveImage} />;
                  default:
                    return null;
                }
              }
              }
              customNodeRules={[
                renderRule(isCode, ({ node, key }) => (
                  <div className={styles.codeBlock}>
                    <CodeBlock key={key} codestring={node.code} language={node.language}>
                      {node.code}
                    </CodeBlock>
                  </div>
                ))
              ]}
            />

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
    excerpt
    publishDate
    seo {
      description
      image {
        url
      }
      title
      twitterCard
    }
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