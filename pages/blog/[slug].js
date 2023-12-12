import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { getPosts } from "../../lib/api";
import { request } from "../../lib/datocms";
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
export default function Blogpost (props) {
  const { postData } = props;
  return (
    <>
      <h1>{postData.title}</h1>
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
    }
    publishDate
  }
}
`;

export const getStaticProps = async ({ params }) => {
  const postQuery = await request({
    query: POST_QUERY,
    variables: {slug: params.slug},
  });
  return {
    props: {
      postData: postQuery.post,
     },
  };
}