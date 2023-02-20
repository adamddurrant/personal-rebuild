import React from "react";
import Head from "next/head";
import Link from "next/link";
import util from "../styles/util.module.css";
import { Client } from "@notionhq/client";
import TestimonialTile from "../components/tiles/testimonialTile";

export default function testimonials({ reviews }) {
  const description =
    "I have been fortunate enough to work with some genuine rockstars. Here's what they had to say:";
  const pageTitle = "Adam Durrant | Testimonials";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={description} />
        <meta
          property='og:url'
          content='https://adamdurrant.co.uk/testimonials'
        />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={description} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={description} />
      </Head>
      <main className={util.page} id='testimonialsPage'>
        <div className={util.pageColumn}>
          <h1 className={util.header}>Kind Words</h1>
          <div className={util.inset}>
            <p className={util.description}>{description}</p>
            <div className={util.flexGrid}>
              {reviews.map((item) => (
                <TestimonialTile
                  key={item.id}
                  profileUrl={item.properties.profile.files[0].file.url}
                  title={item.properties.name.title[0].plain_text}
                  content={item.properties.content.rich_text}
                  url={item.properties.linkedin.url}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

//notion API
export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const response = await notion.databases.query({
    database_id: process.env.TESTIMONIAL_DATABASE_ID,
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
      reviews: response.results,
    },
    revalidate: 5,
  };
};
