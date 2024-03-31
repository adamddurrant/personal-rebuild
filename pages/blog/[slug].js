import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "../../pages/blog/index.module.css"
import { request } from "../../lib/datocms";
import { Image, renderRule, StructuredText, renderMetaTags } from "react-datocms"
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

function readingTime(body) {
  const contentString = JSON.stringify(body);
  const wordsPerMinute = 220
  const cleanText = contentString.replace(/<\/?[^>]+(>|$)/g, "");
  const noOfWords = cleanText.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return `${readTime} minute read`
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
}

export default function Blogpost(props) {

  const { postData } = props;

  let body = postData.body.value.document.children;

  return (
    <>
      <Head>
        <title>{postData.title} | ADurrant</title>
        <meta name='description' content={postData.excerpt} />
        <meta property='og:title' content={postData.title} />
        <meta property='og:description' content={postData.excerpt} />
        <meta name='twitter:title' content={postData.title} />
        <meta name='twitter:description' content={postData.excerpt} />
      </Head>

      <article className={util.page}>

        <div style={{ maxWidth: "50rem" }} className={util.pageColumn}>

          <div className={styles.breadcrumb}>
          <Link scroll={false} href='/blog'>Blog</Link><span className={styles.crumbSpacer}>&gt;</span><p className={styles.crumbTitle}>{postData.title}</p>
          </div>

          <section className={styles.headerGroup}>

            <div className={styles.header}>
              <div className={styles.readTimeWrapper} style={{ marginRight: "10px" }}>
                <p className={styles.readTime}>{readingTime(body)}</p>
              </div>
              <h1 style={{ textAlign: "left" }} className={util.blogHeader}>
                {postData.title}
              </h1>
              <p className={styles.excerpt}>{postData.excerpt}</p>
            </div>

            <div className={util.flexColumn + " " + styles.metaData}>
              <div className={util.flexRow + " " + styles.authorWrapper}>
                <div style={{ marginRight: "10px" }}>
                  <Image data={authorImage} style={{ borderRadius: "100px", width: "40px", height: "40px" }} />
                </div>
                <div>
                  <p className={styles.authorName}>By Adam Durrant</p>
                  <a
                    className={util.tweetLink}
                    style={{ fontSize: "12px" }}
                    href='https://twitter.com/AdamDDurrant'>
                    @adamddurrant
                  </a>
                </div>
              </div>
              <p className={styles.publishDate}>Published: {formatDate(postData.publishDate)}</p>
              {/* <p style={{ marginTop: "10px" }} className={styles.updateDate}>Updated: {formatDate(postData._updatedAt)}</p> */}
            </div>

          </section>

          <section style={{ maxWidth: "40rem", marginLeft: "auto", marginRight: "auto" }} className={util.body}>

            <StructuredText data={postData.body}
              renderBlock={({ record }) => {
                switch (record.__typename) {
                  case "ImageRecord":
                    return (
                      <div className={styles.blog_inlineImage}>
                        <Image data={record.image.responsiveImage} />
                      </div>
                    )
                  default:
                    return null;
                }
              }
              }
              customNodeRules={[
                renderRule(isCode, ({ node, key }) => (
                  <div key={key} className={styles.codeBlock}>
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
      title
    }
    _updatedAt
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