import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ProjectTile from "../components/tiles/projectTile";
import { useRouter } from "next/router";
import Script from "next/script";

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

  //page header and in-page description
  const description =
    "Since 2016, I’ve focused all my energy on progressing a career in SEO. I am slowly transitioning to focus more of my attention to writing code and building web applications. More interesting projects will be added to this page soon.";
  const pageTitle = "Adam Durrant | Coding Projects";
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
              image='px-to-rem-extension'
              title='Px to rem unit converter extension'
              content='A pixel unit to rem unit chrome extension. I work a lot outside of an IDE and all other extensions I found were slow and click intensive.'
              type='Chrome Extenson · JavaScript · Side Project'
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
            <ProjectTile
              image='shopping-list'
              title='Shopping List CRUD'
              content={
                "It might be cliché but I couldn't find a simple and unbloated shopping list app to use with my partner. Please reach out for the password if you want to play (it's our actual shopping list). "
              }
              type='HTML · CSS · Vanilla JS · Firebase · Side Project'
              date='2021-02-20'
              url={"https://shopping-list-regsnmcwt-adamddurrant.vercel.app/"}
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
