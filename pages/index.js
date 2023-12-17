import Head from "next/head";
import Link from "next/link";
const { Client } = require("@notionhq/client");
import { request } from "../lib/datocms";
import styles from "../pages/index.module.css";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingCard from "../components/onboardingCard";
import HomeUpdatesTile from "../components/tiles/home-tiles/homeUpdatesTile";
import ReadingListTile from "../components/tiles/home-tiles/readingListTile";
import BlogTile from "../components/tiles/home-tiles/blogTile";
import StructuredData from "../components/structuredData";

export default function Home({ data, readingList, posts }) {
  const tips = [
    {
      id: "useShortCut",
      text: "Use keyboard shortcut 1 → 0 to navigate between pages. Try press 2, 3, 4, then 1 to come back here.",
      ctaText: null,
      ctaLink: null,
    },
    {
      id: "firstTime",
      text: "Get to know me. I love modern web dev, sushi and over-engineered personal sites — ",
      ctaText: "See my about page →",
      ctaLink: "/about",
    },
    {
      id: "seeReviews",
      text: "I am fortunate to have worked with some inspiring people and rockstar brands — ",
      ctaText: "See what they have to say →",
      ctaLink: "/testimonials",
    },
    {
      id: "referenceSJ",
      text: "This site was forked and restructured from my favourite designer & developer SJ Zhang — ",
      ctaText: "Learn how it's made →",
      ctaLink: "/about#site",
    },
    {
      id: "openCal",
      text: "I enjoy meeting people and love to help where I can. Feel free to book some time together — ",
      ctaText: "My open calendar is here ↗",
      ctaLink: "https://cal.com/adam-durrant-z9wzhk/15min",
    },
    {
      id: "seeProject",
      text: "My web development journey is still in its infancy but, I have a small collection of code projects — ",
      ctaText: "See projects →",
      ctaLink: "/projects",
    },
  ];
  //create currentlist of what user need to see
  const [currentTips, setCurrentTips] = React.useState([0]);
  //on load, check masterlist with location storage,
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    let newTips = tips;
    tips.forEach((tip) => {
      if (localStorage.getItem(tip.id)) {
        newTips = newTips.filter((e) => e.id != tip.id);
      }
    });
    //render currentlist
    setCurrentTips(newTips);
    //hide the tip section - framer motion depends on this
    newTips.length < 1 ? setIsVisible(false) : setIsVisible(true);
  }, []);

  const [userTime, setUserTime] = React.useState(null);

  //if all dismissed destroy the box with motion
  useEffect(() => {
    currentTips.length < 1 ? setIsVisible(false) : null;
  }, [currentTips]);

  //when user click on the x on onboarding cards
  //remove the card and write in local storage to not show again
  function handleOnboardingDismiss(e) {
    e.preventDefault();
    let element = e.target.parentElement;
    localStorage.setItem(element.id, true);
    let newTips = currentTips;
    newTips = newTips.filter((e) => e.id != element.id);
    //remove from current array to trigger a change
    setCurrentTips(newTips);
  }

  function resetOnboarding() {
    setCurrentTips(tips);
    tips.forEach((tip) => {
      localStorage.removeItem(tip.id);
    });
    setIsVisible(true);
  }

  useEffect(() => {
    let thisPage = document.querySelector("#recentsPage");
    let top = sessionStorage.getItem("recents-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("recents-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    var greeting =
      hour > 17
        ? "Good evening"
        : hour > 11
          ? "Good afternoon"
          : hour > 4
            ? "Good morning"
            : hour > 2
              ? "It's late, go to bed"
              : "Hello";
    setUserTime(greeting);
  }, []);

  const blogs = posts.allPosts;

  const description = "Adam Durrant - Growing ambitious brands online. Working with and learning from inspiring people along the way.";

  const pageTitle = "Adam Durrant | SEO Specialist & Front-end Web Developer";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adam Durrant",
    "description": "Adam Durrant (born 26 July 1992 in Birmingham, England), is an SEO consultant & front end web developer.",
    "height": "180 cm",
    "nationality": "British",
    "birthDate": "26 July 1992",
    "Gender": "Male",
    "url": "https://adamdurrant.co.uk/",
    "image": "https://adamdurrant.co.uk/me/adam-durrant.jpg",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Coventry University",
      "url": "https://www.coventry.ac.uk/"
    },
    "sameAs": ["https://twitter.com/adamddurrant", "https://www.linkedin.com/in/adam-durrant/", "https://github.com/adamddurrant"]
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:url' content='https://adamdurrant.co.uk/' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={description} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={description} />
        <StructuredData data={structuredData} />
      </Head>
      <main className={util.page} id='recentsPage'>
        <div className={styles.homeColumn}>
          <h1 className={styles.homeGreetingTitle}>
            {userTime ? userTime : "Hello"}
          </h1>
          <span className={styles.mobileTinyText}>
            My name is Adam Durrant, I&apos;m an SEO Specialist on a mission to shift my career to coding full-time.
          </span>
          <span className={styles.tinyText}>
          My name is Adam Durrant, I&apos;m an SEO Specialist on a mission to shift my career to coding full-time —{" "}
            {isVisible ? `Learn more about me ↓` : null}
            {!isVisible ? (
              <span onClick={resetOnboarding} className={styles.reset}>
                Need a refresher? Reset onboarding.
              </span>
            ) : null}
          </span>
          <AnimatePresence mode={"sync"}>
            {isVisible && (
              <motion.div
                className={styles.introContainer}
                layout
                // transition={{ type: "spring" }}
                initial={{
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                animate={{
                  opacity: 1,
                  height: 180,
                  transition: { delay: 0.25, duration: 0.4, ease: "easeInOut" },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <AnimatePresence mode={"popLayout"}>
                  {currentTips.map((tip) => (
                    <OnboardingCard
                      key={tip.id}
                      handleDismiss={handleOnboardingDismiss}
                      id={tip.id}
                      text={tip.text}
                      ctaText={tip.ctaText}
                      ctaLink={tip.ctaLink}
                      ref={React.createRef()}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={styles.homeSectionContainer}>
            <h2 className={styles.homeSectionTitle}>Personal updates</h2>
            <Link href='/about#about-update'>
              <a className={styles.homeLinkButton}>View All</a>
            </Link>
          </div>
          <ul className={styles.homeUpdatesGrid}>
            {data.map((item) => (
              <HomeUpdatesTile
                key={item.id}
                logoUrl={item.properties.icon.url}
                title={item.properties.Name.title[0].plain_text}
                content={item.properties.Description.rich_text}
                url={item.properties.URL.url}
                date={item.properties.Date.date.start}
              />
            ))}
          </ul>
          <div className={styles.homeSectionContainer}>
            <h2 className={styles.homeSectionTitle}>Recent posts</h2>
            <Link href='/blog'>
              <a className={styles.homeLinkButton}>View All</a>
            </Link>
          </div>{" "}
          <ul className={util.homePostsGrid}>
            {blogs.map((blog, index) => {
              return (
                <BlogTile
                  key={index}
                  image={blog.featuredImage}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  url={blog.slug}
                />
              )
            })}
          </ul>
          <div className={styles.homeSectionContainer}>
            <h2 className={styles.homeSectionTitle}>Reading List</h2>
            <Link href='/reading-list'>
              <a className={styles.homeLinkButton}>View All</a>
            </Link>
          </div>{" "}
          <ul className={styles.homeReadingGrid}>
            {readingList.map((link) => (
              <ReadingListTile
                key={link.id}
                title={link.properties.Name.title[0].plain_text}
                url={link.properties.URL.url}
                date={link.created_time}
                fav={link.properties.Fav.checkbox}
                tags={link.properties.Tags.multi_select}
              />
            ))}
          </ul>
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
    page_size: 4,
  });

  const readingListResponse = await notion.databases.query({
    database_id: process.env.READING_LIST_DATABASE_ID,
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
        property: "Created",
        direction: "descending",
      },
    ],
    page_size: 8,
  });

  const blogPosts = await request({
    query: POSTS_QUERY
  });

  return {
    props: {
      data: response.results,
      posts: blogPosts,
      readingList: readingListResponse.results,
    },
    revalidate: 5,
  };
};

const POSTS_QUERY = ` 
query Posts {
  allPosts(orderBy: publishDate_DESC, filter: {}, first: "4") {
    title
    slug
    featuredImage {
      responsiveImage {
        alt
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
      }
    }
    excerpt
  }
}
`;