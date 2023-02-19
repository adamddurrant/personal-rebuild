/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ContactContent from "../components/contactContent";
import ExpTile from "../components/tiles/expTile";
import Image from "next/image";
const { Client } = require("@notionhq/client");
import Tile from "../components/tiles/tile";
import SkillsIcon from "../components/skillsIcon";
import { getAllUpdates } from "../lib/notion";

export default function About({ data }) {
  useEffect(() => {
    let thisPage = document.querySelector("#aboutPage");
    let top = sessionStorage.getItem("about-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("about-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  const description =
    "I’m an SEO specialist and front-end developer by trade. I currently spend most of my spare time learning React. Welcome to my corner of the internet. Here I share my writings, favourite resources, personal updates and career adventures.";
  return (
    <>
      <Head>
        <title>Adam Durrant · About</title>
        <meta name='description' content={description} />
      </Head>
      <main className={util.page} id='aboutPage'>
        <div className={util.pageColumn}>
          <h1 className={util.header}>About</h1>
          <div className={util.inset}>
            <p className={util.description}>{description}</p>

            <div className={util.read}>
              <h2 style={{ padding: "1rem 0rem 0rem 0rem" }} id='about-update'>
                Personal updates
              </h2>
            </div>
            <ul className={util.list} style={{ margin: "0rem 0rem 0rem 0rem" }}>
              {data.map((item) => (
                <Tile
                  key={item.id}
                  logoUrl={item.properties.image.files[0].file.url}
                  title={item.properties.Name.title[0].plain_text}
                  content={item.properties.Description.rich_text}
                  url={item.properties.URL.url}
                  date={item.properties.Date.date.start}
                />
              ))}
            </ul>
            <div className={util.divider}></div>
            <div className={util.read}>
              <h2>About me</h2>
              <p>
                {
                  "I have almost a decade of experience as a professional SEO specialist. I've worked freelance, in-house and agency-side for startups, SMEs and enterprise business. "
                }

                {"My work have been featured in; "}
                <a
                  href='https://www.searchenginewatch.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}
                >
                  Search Engine Watch
                </a>
                {", "}
                <a
                  href='https://trafficthinktank.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}
                >
                  Traffic Think Tank
                </a>
                {", "}
                <a
                  href='https://www.seofomo.co/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}
                >
                  SEO FOMO
                </a>
                {" and "}
                <a
                  href='https://www.oncrawl.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}
                >
                  Oncrawl
                </a>

                {
                  ". For as long as I can remember I have been passionate about the web and fascinated by code."
                }
              </p>
              <p>
                {
                  "My personal mission is to be part of growing ambitious brands online, working with and meeting the most creative and ambitious people along the way."
                }
              </p>

              <div className={util.read}>
                <h2 style={{ padding: "1rem 0rem 0rem 0rem" }} id='about-tools'>
                  Software & Technologies
                </h2>
                <p className={util.read}>
                  My front end dev journey is still in its infancy but, I am
                  dabbling with numerous languages and frameworks to understand
                  what I enjoy most. The Next.js used to build this website for
                  example has opened my eyes to using this React framework as
                  often as possible.
                </p>
                <p>
                  Despite this, I am experimenting, working and coding most with
                  the following tech stack:
                </p>

                <div className={util.flexRow}>
                  <div className={util.flexRow + "" + util.alignCenter}>
                    <p class={util.smlHeading}>Development:</p>
                  </div>
                  <div className={util.flexRow}>
                    <SkillsIcon icon={"html"} technology={"HTML 5"} />
                    <SkillsIcon icon={"css"} technology={"CSS 3"} />
                    <SkillsIcon
                      icon={"javascript"}
                      technology={"JavaScript ES6"}
                    />
                    <SkillsIcon icon={"react"} technology={"React"} />
                    <SkillsIcon icon={"tailwind"} technology={"Tailwind CSS"} />
                    <SkillsIcon icon={"webflow"} technology={"Webflow"} />
                    <SkillsIcon icon={"wordpress"} technology={"WordPress 6"} />
                  </div>
                </div>
                <div style={{ paddingTop: "20px" }} className={util.flexRow}>
                  <div className={util.flexRow + "" + util.alignCenter}>
                    <p class={util.smlHeading}>Design:</p>
                  </div>
                  <div className={util.flexRow}>
                    <SkillsIcon icon={"figma"} technology={"Figma"} />
                    <SkillsIcon icon={"framer"} technology={"Framer Motion"} />
                    <SkillsIcon
                      icon={"photoshop"}
                      technology={"Adobe Photoshop"}
                    />

                    <SkillsIcon icon={"xd"} technology={"Adobe Xd"} />
                  </div>
                </div>

                <div style={{ paddingTop: "20px" }} className={util.flexRow}>
                  <div className={util.flexRow + "" + util.alignCenter}>
                    <p class={util.smlHeading}>Productivity:</p>
                  </div>
                  <div className={util.flexRow}>
                    <SkillsIcon icon={"jira"} technology={"Jira"} />
                    <SkillsIcon icon={"git"} technology={"Git"} />
                    <SkillsIcon icon={"slack"} technology={"Slack"} />
                    <SkillsIcon icon={"loom"} technology={"Loom"} />
                    <SkillsIcon icon={"cron"} technology={"Cron"} />
                  </div>
                </div>
              </div>

              <h2>Career</h2>
              <p className={util.read}>
                {"I’m currently working at series B biotech company "}
                <a
                  href='https://joinzoe.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}
                >
                  ZOE
                </a>
                {". "}
                {
                  "In the 7+ years that I've been working in the SEO industry I have made it my mission to learn by doing. I started my career at the bottom as an SEO assistant and quickly realised how much impact I could make as a solo marketeer. Since then, i've been hooked on all things web."
                }
              </p>
              <p>
                {
                  "I have added a brief summary below. If you are interested to learn more, "
                }
                <a
                  href='https://www.linkedin.com/in/s-j-zhang/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}
                >
                  visit my Linkedin
                </a>
              </p>
            </div>
            <div>
              <ExpTile
                date='2022–Now'
                title='SEO Manager at ZOE'
                url={"https://joinzoe.com/"}
                content={
                  "Inspired by the brand and their mission I joined ZOE as their first and only SEO manager to support ambitious growth goals."
                }
              />
              <ExpTile
                date='2021'
                title='SEO Consultant at Brainlabs Digital'
                url={"https://www.brainlabsdigital.com/"}
                content={
                  "Led SEO strategy, planning and execution for household name brands as their main POC. Working in a team of 10."
                }
              />
              <ExpTile
                date='2020'
                title='Digital Marketing Manager at Tots to Travel'
                content={
                  "Owned SEO & paid social in house with external agency management of other paid channels."
                }
              />
              <ExpTile
                date='2019'
                title='SEO & Content Specialist at CIPS'
                url={"https://www.cips.org/"}
                content={
                  "Main SEO POC globally including APAC teams. Oversaw technical and content strategy."
                }
              />
              <ExpTile
                date='2018'
                title='SEO & Data Lead at Zazzle Media'
                url={"https://www.zazzlemedia.co.uk/"}
                content={
                  "Main SEO POC for varied clients in finance and eCommerce. Executed strategy as dictated by strategy lead."
                }
              />
              <ExpTile
                date='2016'
                title='SEO & Content Executive at Interflora'
                content={
                  "Primarily worked on Interflora's portfolio brands building on an existing SEO strategy but touching all aspects of optimisation."
                }
                url={"https://www.interflora.co.uk/"}
              />
            </div>
            <div className={util.read}>
              <h2>This site</h2>
              <p>
                This site was forked, rebuilt and modified from a build by
                <a href='https://www.linkedin.com/in/s-j-zhang'>S J Zhang</a> A
                designer I take a lot of inspiration from.
              </p>
              <p>
                I&apos;m in the process of learning React & Next.js and totally
                fell in love with SJ&apos;s design so, I set about destructuring
                his work and putting it back together piece by piece while
                making it my own. I did this for a few reasons:
              </p>
              <ol
                type='1'
                start='1'
                style={{ padding: "0rem 0rem 0rem 1.25rem" }}
              >
                <li style={{ marginBottom: "0.5rem" }}>
                  To motivate myself to read, interpret and understand code
                  written by other developers.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  To keep myself accountable with my goal of becoming proficient
                  in front end development.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  To stay actively engaged with the modern frameworks &
                  libraries.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  To encourage myself to create and share more often. A
                  beautiful site that i&apos;m proud of, keeps me driven.
                </li>
              </ol>
              <p>
                Because he&apos;s amazing, SJ has kindly licensed this build for
                anyone to use as a base starting place{" "}
                <a href='https://github.com/sjzhan9/sj-land'>over on Github</a>{" "}
                so you can try it too!
              </p>
              <p>
                The site is built with{" "}
                <a
                  href='https://nextjs.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}
                >
                  Next.js
                </a>{" "}
                and deployed on{" "}
                <a
                  href='https://vercel.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}
                >
                  Vercel
                </a>
                . Content is managed in{" "}
                <a
                  href='http://notion.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}
                >
                  Notion
                </a>{" "}
                and statically pre-rendered through{" "}
                <a
                  href='https://developers.notion.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}
                >
                  Notion API
                </a>
                . Radix UI is used for front-end components like modals and
                tooltips.{" "}
                <a
                  href='https://github.com/pacocoursey/next-themes'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}
                >
                  Next Themes
                </a>{" "}
                controls light/dark-mode and made implementation a lot easier.
              </p>
              {/* <div className={util.divider}></div> */}

              <h2 style={{ margin: "4rem 0rem -0.5rem 0rem" }}>Contact</h2>
            </div>
            <div className={util.inset} style={{ marginBottom: "4rem" }}>
              <ContactContent />
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
    database_id: process.env.UPDATES_DATABASE_ID,
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
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return {
    props: {
      data: response.results,
    },
    revalidate: 5,
  };
};
