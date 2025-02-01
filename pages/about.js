/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ContactContent from "../components/contactContent";
import ExpTile from "../components/tiles/expTile";
const { Client } = require("@notionhq/client");
import Tile from "../components/tiles/tile";
import SkillsIcon from "../components/skillsIcon";

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

  const description = "I’m an ex-SEO specialist on a mission to become a proficient web developer. I recently switched up my career to full-time coding and so far, i'm loving it. Here I share my personal updates, info about this website and my career adventures.";
  const pageTitle = "Adam Durrant | About Me"; 
 
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:url' content='https://adamdurrant.co.uk/about' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={description} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={description} />
      </Head>
      <main className={util.page} id='aboutPage'>
        <div className={util.pageColumn}>
          <h1 className={util.header}>About</h1>
          <div className={util.inset}>
            <p className={util.description + " " + util.read}>I&apos;m Adam, an ex <a className={util.normalLink} href="https://zoe.com/">ZOE</a>, ex <a className={util.normalLink} href="https://www.brainlabsdigital.com/">Brainlabs</a> SEO specialist turned web developer. In the last 24 months I retrained to code full-time. Here I share my personal updates, info about this website and my career adventures.</p> 
            <p style={{marginTop: "10px"}} className={util.description + " " + util.read}>🚨 if you are thinking about/are in the process of changing your career to web development and need advice, please <a className={util.normalLink} href="#aboutContact">reach out anytime</a>, i&apos;d love to help.</p>

            <div className={util.read}>
              <h2 style={{ padding: "1rem 0rem 0rem 0rem" }} id='about-update'>
                Personal updates
              </h2>
            </div>
            <ul className={util.list} style={{ margin: "0rem 0rem 0rem 0rem" }}>
              {data.map((item) => (
                <Tile
                  key={item.id}
                  logoUrl={item.properties.icon.url}
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

                {"My work has been featured in; "}
                <a
                  href='https://www.searchenginewatch.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}>
                  Search Engine Watch
                </a>
                {", "}
                <a
                  href='https://trafficthinktank.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}>
                  Traffic Think Tank
                </a>
                {", "}
                <a
                  href='https://www.seofomo.co/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}>
                  SEO FOMO
                </a>
                {" and "}
                <a
                  href='https://www.oncrawl.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}>
                  Oncrawl
                </a>

                {
                  ". For as long as I can remember I have been passionate about the web and fascinated by code."
                }
              </p>
              <p>
                {
                  "My current personal mission is to master my craft while working with ambitious and important brands online. Meeting and working with the most creative and ambitious people I can find along the way. If you need it, here's "
                }
                <a
                  href='/me/adam-durrant.jpg'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}>
                  {" "}
                  a picture of me looking busy
                </a>
                .
              </p>

              <div className={util.read}>
                <h2 style={{ padding: "1rem 0rem 0rem 0rem" }} id='about-tools'>
                  Tech stack
                </h2>
                <p className={util.read}>
                  My web development journey is still in its infancy but, I&apos;m actively learning numerous languages and frameworks to build systems and solve problems to understand what I enjoy. I used Next.js to build this website but, day to day I am working with Wordpress, PHP and SaSS.
                </p>
                <p>
                  Most commonly I use the following stack:
                </p>

                <div className={util.flexRow}>
                  <div className={util.flexRow + "" + util.alignCenter}>
                    <p className={util.smlHeading}>Development:</p>
                  </div>
                  <div className={util.flexRow} style={{rowGap: "15px"}}>
                    <SkillsIcon icon={"html"} technology={"HTML 5"} />
                    <SkillsIcon icon={"css"} technology={"CSS 3"} />
                    <SkillsIcon
                      icon={"javascript"}
                      technology={"JavaScript ES6"}
                    />
                    <SkillsIcon icon={"react"} technology={"React"} />
                    <SkillsIcon icon={"sass"} technology={"Sass"} />
                    <SkillsIcon icon={"php"} technology={"PHP"} />
                    <SkillsIcon icon={"wordpress"} technology={"WordPress 6"} />
                    <SkillsIcon icon={"webflow"} technology={"Webflow"} />
                    <SkillsIcon icon={"docker"} technology={"Docker"} />
                  </div>
                </div>
                <div style={{ paddingTop: "25px" }} className={util.flexRow}>
                  <div className={util.flexRow + "" + util.alignCenter}>
                    <p className={util.smlHeading}>Design:</p>
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

                <div style={{ paddingTop: "25px" }} className={util.flexRow}>
                  <div className={util.flexRow + "" + util.alignCenter}>
                    <p className={util.smlHeading}>Productivity:</p>
                  </div>
                  <div className={util.flexRow}>
                    <SkillsIcon icon={"jira"} technology={"Jira"} />
                    <SkillsIcon icon={"bitbucket"} technology={"Bitbucket"} />
                    <SkillsIcon icon={"git"} technology={"Git"} />
                    <SkillsIcon icon={"slack"} technology={"Slack"} />
                    <SkillsIcon icon={"loom"} technology={"Loom"} />
                    <SkillsIcon icon={"cron"} technology={"Cron"} />
                  </div>
                </div>
              </div>

              <h2>Career</h2>
              <p className={util.read}>
                {"I currently work as a web developer at "}
                <a
                  href='https://www.pugpig.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}>
                  Pugpig
                </a> a native app publishing platform that powers a big chunk of the worlds biggest names in media such as condé nast, Hearst, Reach, National World, Boston Globe Media and lots more
                {". "}
                {
                  "In the 8+ years prior to Pugpig I've been working in the SEO industry, starting my career at the bottom as an SEO assistant, I quickly realised how much impact I could make as a solo marketeer. Since then, i've been hooked on all things web."
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
                  className={util.externalLink}>
                  visit my Linkedin profile
                </a>
              </p>
            </div>
            <div>
              <ExpTile
                date='2022–Now'
                title='Web Developer at Pugpig'
                url={"https://www.pugpig.com/"}
                content={
                  "Pugpig are one of the most well known publishing platforms on the web. Their product and client services power some of the world's leading media brands."
                }
              />
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
              <h2 id='site'>How this site was made</h2>
              <p>
                This site was forked and modified from {" "}
                <a href='https://www.linkedin.com/in/s-j-zhang'>S J Zhang</a>. A
                designer I adore.
              </p>
              <p>
                I&apos;m in the process of learning React & Next.js and totally
                fell in love with SJ&apos;s design so, I set about destructuring
                his work, understanding it and putting it back together piece by piece while
                making it my own. I did this for a few reasons:
              </p>
              <ol
                type='1'
                start='1'
                style={{ padding: "0rem 0rem 0rem 1.25rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>
                  To motivate myself to read, interpret and understand code
                  written by others
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  To keep myself accountable with my goal of becoming proficient
                  in modern front end development
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  To stay actively engaged with the the latest frameworks &
                  libraries used by people smarter than me
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  To encourage myself to make and share more frequently. A
                  beautiful site that i&apos;m proud of keeps me driven
                </li>
              </ol>
              <p>
                Because he&apos;s amazing, SJ has kindly licensed this build for
                anyone{" "}
                <a href='https://github.com/sjzhan9/sj-land'>over on Github</a>{" "}
                so you can grab it too!
              </p>
              <p>
                The site is built with{" "}
                <a
                  href='https://nextjs.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}>
                  Next.js
                </a>{" "}
                and deployed on{" "}
                <a
                  href='https://vercel.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}>
                  Vercel
                </a>
                . Most of the content is managed in{" "}
                <a
                  href='http://notion.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.normalLink}>
                  Notion
                </a>{" "}
                and statically pre-rendered through the{" "}
                <a
                  href='https://developers.notion.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}>
                  Notion API
                </a>
                . I ran into problems rendering images that are hosted on notion
                because uploaded images{" "}
                <a
                  href='https://developers.notion.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}>
                  regularly regenerate
                </a>.
                </p>
                <p>
                  To solve for this, I have recently replatformed the blog section using  <a
                  href='https://www.datocms.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}>
                  DatoCMS
                </a> which I cannot recommend enough for its ease of implementation and awesome capabilities via GraphQL. <a
                  href='https://www.radix-ui.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}>
                  Radix UI
                </a> is also used for front-end components like
                modals and tooltips.{" "}
                <a
                  href='https://github.com/pacocoursey/next-themes'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={util.externalLink}>
                  Next Themes
                </a>{" "}
                controls light/dark-mode and made implementation a lot easier.
              </p>
              {/* <div className={util.divider}></div> */}

              <h2 id="aboutContact" style={{ margin: "4rem 0rem -0.5rem 0rem" }}>Contact</h2>
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
