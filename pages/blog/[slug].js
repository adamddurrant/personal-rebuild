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
export default function Post (props) {
  const { data } = props;
  return (
    <>

    </>
  );
};

// export async function getStaticProps({ params, preview = false }) {
//   const data = await getPostAndMorePosts(params.slug, preview);
//   const content = await markdownToHtml(data?.post?.content || "");

//   return {
//     props: {
//       preview,
//       post: {
//         ...data?.post,
//         content,
//       },
//       morePosts: data?.morePosts ?? [],
//     },
//   };
// }


const PATHS_QUERY = ` 
query Paths {
  allPosts {
    slug
  }
}
`;

export async function getStaticPaths() {
  const slugQuery = await request({
    query: PATHS_QUERY
  });
  let paths = [];
  slugQuery.allPosts.map((p) => paths.push(`/blog/${p.slug}`));

  return {
    paths,
    fallback: false,
  };
}


const POST_QUERY = ` 
query Posts {
  allPosts {
    title
    publishDate
    slug
  }
}
`;

// Props functon from dato
export async function getStaticProps() {
  const data = await request({
    query: POST_QUERY
  });
  return {
    props: { data }
  };
}