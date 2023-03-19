import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { getAllPublished, getSingleBlogPostBySlug } from "../../lib/notion";
import util from "../../styles/util.module.css";
import style from "./markdownStyles.module.css";
import gfm from "remark-gfm";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const CodeBlock = ({ language, codestring }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag='div'>
      {codestring}
    </SyntaxHighlighter>
  );
};
const Post = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.metadata.title} | ADurrant</title>
        <meta name='description' content={post.metadata.description} />
        <meta property='og:title' content={post.metadata.title} />
        <meta property='og:description' content={post.metadata.description} />
        <meta name='twitter:title' content={post.metadata.title} />
        <meta name='twitter:description' content={post.metadata.description} />
      </Head>
      <article className={util.page} id='aboutPage'>
        <div className={util.pageColumn}>
          <h1 style={{ marginTop: "20px" }} className={util.blogHeader}>
            {post.metadata.title}
          </h1>
          <div
            className={util.tags + " " + util.flexColumn + " " + util.postMeta}>
            <div
              className={util.flexMeta}
              style={{ justifyContent: "center", alignItems: "center" }}>
              <span className={util.postDate}>{post.metadata.date}</span>
              <p className={post.metadata.tags[0].color + "Tag tag"}>
                {post.metadata.tags[0].name}
              </p>
            </div>

            <div className={util.flexRow} style={{ marginTop: "30px" }}>
              <div style={{ marginRight: "10px" }}>
                <Image
                  priority
                  width={40}
                  height={40}
                  src='/me/adam-durrant.jpg'
                  alt='Adam Durrant'
                  style={{ borderRadius: "100px" }}
                />
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
          <ReactMarkdown
            remarkPlugins={[gfm]}
            className={style.reactMarkDown}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <CodeBlock
                    codestring={String(children).replace(/\n$/, "")}
                    language={match[1]}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}>
            {post.markdown}
          </ReactMarkdown>
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

export const getStaticProps = async ({ params }) => {
  const post = await getSingleBlogPostBySlug(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 5,
  };
};

export const getStaticPaths = async () => {
  const posts = await getAllPublished();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;
