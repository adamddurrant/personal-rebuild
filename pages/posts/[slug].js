import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { getAllPublished, getSingleBlogPostBySlug } from "../../lib/notion";
import util from "../../styles/util.module.css";
import style from "./markdownStyles.module.css";

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
      <article className={util.page} id='aboutPage'>
        <div className={util.pageColumn}>
          <h1 className={util.header}>{post.metadata.title}</h1>
          <div className={util.tags + " " + util.flexRow + " " + util.postMeta}>
            <span className={util.postDate}>{post.metadata.date}</span>
            <p className={post.metadata.tags[0].color + "Tag tag"}>
              {post.metadata.tags[0].name}
            </p>
          </div>
          <ReactMarkdown
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
            }}
          >
            {post.markdown}
          </ReactMarkdown>
        </div>
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
    revalidate: 60,
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
