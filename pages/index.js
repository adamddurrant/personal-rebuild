import Head from "next/head";
import Link from "next/link";
const { Client } = require("@notionhq/client");
import styles from "../pages/index.module.css";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingCard from "../components/onboardingCard";
import HomeUpdatesTile from "../components/tiles/homeUpdatesTile";

export default function Home({ data }) {
  const tips = [
    {
      id: "useShortCut",
      text: "Use keyboard shortcut 1 → 0 to navigate between pages. Try press 2, 3, 4, then 1 to come back here.",
      ctaText: null,
      ctaLink: null,
    },
    {
      id: "firstTime",
      text: "I love modern web development, sushi and over-engineered personal sites — ",
      ctaText: "More about me →",
      ctaLink: "/about",
    },
    {
      id: "seeReviews",
      text: "I am fortunate to have worked with some rockstar brands, see what they say about working with me — ",
      ctaText: "See kind words →",
      ctaLink: "/kind-words",
    },
    {
      id: "referenceSJ",
      text: "This site was forked and restructured from a build by a designer and developer that inspires me — SJ Zhang",
      ctaText: "See the code →",
      ctaLink: "https://github.com/sjzhan9/sj-land",
    },
    {
      id: "openCal",
      text: "I enjoy meeting inspiring people and love to help where I can. Feel free to book a call. ",
      ctaText: "My open calendar is here ↗",
      ctaLink: "https://cal.com/sjzhang/15min",
    },
    {
      id: "seeProject",
      text: "I'm early in my front-end dev journey but I have a small collection of coded projects — ",
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

  const description =
    "I’m a designer and developer by training and trade. I spend most of my spare time reading about business, finance and crypto. If this combination interests you, welcome to my corner of the internet. This is where I share my reading list, investment updates, and software adventures.";

  return (
    <>
      <Head>
        <title>
          Adam Durrant | SEO Specialist & Meta Certified Web Developer
        </title>
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.gif' type='image/gif' />
        <meta property='og:image' content='https://www.sj.land/og/index.png' />
      </Head>
      <main className={util.page} id='recentsPage'>
        <div className={styles.homeColumn}>
          <h1 className={styles.homeGreetingTitle}>
            {userTime ? userTime : "Hello"}
          </h1>
          <span className={styles.tinyText}>
            My name is Adam —{" "}
            {isVisible
              ? `Below are tips to help get you started on this website ↓`
              : null}
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
                logoUrl={item.properties.image.files[0].file.url}
                title={item.properties.Name.title[0].plain_text}
                content={item.properties.Description.rich_text}
                url={item.properties.URL.url}
                date={item.properties.Date.date.start}
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

  return {
    props: {
      data: response.results,
    },
    revalidate: 5,
  };
};
