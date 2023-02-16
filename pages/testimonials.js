import React from "react";
import Head from "next/head";
import Link from "next/link";
import util from "../styles/util.module.css";
import { Client } from "@notionhq/client";
import TestimonialTile from "../components/tiles/testimonialTile";

export default function testimonials({ reviews }) {
  console.log(reviews);
  const description =
    "I have been fortunate enough to work with some rockstars. Here's what they had to say.";
  return (
    <>
      <Head>
        <title>Adam Durrant · Testimonials</title>
        <meta name='description' content={description} />
        <meta property='og:image' content='https://www.sj.land/og/index.png' />
      </Head>
      <main className={util.page} id='testimonialsPage'>
        <div className={util.pageColumn}>
          <h1 className={util.header}>Kind words</h1>
          <div className={util.inset}>
            <p className={util.description}>{description}</p>
            <div className={util.read}></div>
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
  });

  return {
    props: {
      reviews: response.results,
    },
    revalidate: 5,
  };
};