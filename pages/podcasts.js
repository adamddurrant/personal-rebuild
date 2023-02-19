import Head from "next/head";
import Image from "next/image";
import util from "../styles/util.module.css";
import Link from "next/link";
import React, { useEffect } from "react";
const { Client } = require("@notionhq/client");
import PodcastTile from "../components/tiles/podcastTile";
import Script from "next/script";

export default function Podcasts({ list }) {
  useEffect(() => {
    let thisPage = document.querySelector("#podcastPage");
    let top = sessionStorage.getItem("podcast-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("podcast-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  //page header and in-page description
  const description =
    "A collection of podcasts I listen to on a regular basis for learning, health and entertainment.";

  const pageTitle = "Adam Durrant | Favourite Podcasts";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:url' content='https://adamdurrant.co.uk/podcasts' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={description} />
      </Head>
      <main className={util.page} id='podcastPage'>
        <div className={util.pageColumn}>
          <h1 className={util.header}>Podcasts</h1>
          <p className={util.description}>{description}</p>
          <ul className={util.grid}>
            {list.map((item) => (
              <PodcastTile
                key={item.id}
                imageUrl={item.properties.Logo.files[0].file.url}
                title={item.properties.Name.title[0].plain_text}
                content={item.properties.Body.rich_text[0].plain_text}
                url={item.properties.URL.url}
                tags={item.properties.Tags.multi_select}
                fav={item.properties.Fav.checkbox}
              />
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
//notion API
export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const response = await notion.databases.query({
    database_id: process.env.PODCASTS_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Display",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Order",
        direction: "ascending",
      },
    ],
  });

  return {
    props: {
      list: response.results,
    },
    revalidate: 60,
  };
}
