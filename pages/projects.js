import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ProjectTile from "../components/tiles/projectTile";
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function Projects() {
  useEffect(() => {
    let thisPage = document.querySelector("#projectsPage");
    let top = sessionStorage.getItem("projects-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("projects-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  // Page header and in-page description
  const description =
    "Below is a collection of projects I've worked on outside employment. Some are side projects, some are freelance work.";
  const pageTitle = "Coding Projects | Adam Durrant";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:url' content='https://adamdurrant.co.uk/projects' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={description} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={description} />
      </Head>

      <main id='projectsPage' className={util.page}>
        <div className={util.pageColumn}>
          <h1 className={util.header}>Projects</h1>
          <p className={util.description}>{description}</p>
          <ul className={util.list}>
            <ProjectTile
              image='qr-guard'
              title='QR scanner with security checks'
              content='Why this doesn&apos;t exist already, I do not know - basic security checks on QR data that flags issues before visiting the destination page.'
              type='Expo · React Native · Side Project'
              date='2025-10-11'
            />
            <ProjectTile
              image='frontend-wrapped'
              title='Frontend Wrapped'
              content='After retraining to learn to code I revisited an old no-code project to see if I could remake it with-code.'
              type='Web app · NextJS · Notion · Side Project'
              date='2024-08-20'
              url='https://dev-tweets-git-main-personal-pro.vercel.app/'
            />
            <ProjectTile
              image='tug-of-war-project'
              title='Tug of war mobile game'
              content="A simple React Native game where two players compete by tapping on two sections of the screen (top and bottom). Each tap increases the height of the player&apos;s section while decreasing the height of the opponent&apos;s section until they lose."
              type='Native App · React Native · Side Project'
              date='2025-01-09'
              url='https://github.com/adamddurrant/tug-of-war'
            />
            <ProjectTile
              image='filter-finder'
              title='Wordpress Custom Filter Finder'
              content='Upload a WordPress plugin zip file to extract custom filter hooks to help extend plugins that lack documentation.'
              type='Web app · React · Side Project'
              date='2025-04-19'
              url='https://filter-finder-app.vercel.app/'
            />
            <ProjectTile
              image='px-to-rem-extension'
              title='Px to rem unit converter extension'
              content='A pixel unit to rem unit chrome extension. I work a lot outside of an IDE and all other extensions I found were slow and click intensive.'
              type='Chrome Extension · JavaScript · Side Project'
              date='2023-06-09'
              url='https://chrome.google.com/webstore/detail/px-to-rem-to-px-converter/alofjjmmmhlmapihldheanofnbfdmbop'
            />
            <ProjectTile
              image='zoe'
              title='ZOE Library Reimagined'
              content='A redesign and build of the ZOE blog subfolder. Built to help me learn an epic combo: Nextjs + DatoCMS.'
              type='Nextjs · DatoCMS · Tailwind · Side Project'
              date='2023-01-01'
              url='https://github.com/adamddurrant/zoe-clone'
            />
            <ProjectTile
              image='seotweets'
              title='seotweets.io'
              content={
                "An automated twitter curation web app & newsletter that reached 2k signups. Built, launched and sold."
              }
              type='Webflow · Zapier · Twitter API · Side Project'
              date='2021-05-20'
              url='https://www.producthunt.com/products/seotweets'
            />
            <ProjectTile
              image='pete-mason'
              title='Peter Mason - Pro Lifestyle Photographer'
              content={
                "A site that had a host of legacy issues completely rebuilt and restructured using modern WordPress frameworks. "
              }
              type='WordPress · Vanilla CSS · WPBakery · Freelance'
              date='2019-02-25'
              url='https://peter-mason.com/'
            />
            <ProjectTile
              image='city-academy'
              title='City Academy of Ballet'
              content={
                "The academy was struggling to find new members and had no online presence. The site was built with Webflow and now drives consistent leads to the ballet school via organic search."
              }
              type='Webflow · Freelance'
              date='2022-04-20'
              url={"https://www.cityacademyofballet.co.uk/"}
            />
          </ul>
          <p
            className={util.tileContent}
            style={{ marginTop: "6rem", textAlign: "center" }}>
            {"More soon :)"}
          </p>
        </div>
      </main>
    </>
  );
}
