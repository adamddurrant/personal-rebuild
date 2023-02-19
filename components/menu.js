/* eslint-disable @next/next/no-img-element */
import styles from "../components/menu.module.css";
import { ThemeChanger } from "./theme";
import Link from "next/link";
import NavLink from "./navLink";
import Contact from "./contact";
import util from "../styles/util.module.css";

export default function Menu() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.upper}>
          <Link href='/'>
            <>
              <div className={styles.mainLogo}>
                <img
                  className={
                    util.hiddenOnMobile + " " + util.pointer + " logoInvert"
                  }
                  src='/bolt.svg'
                  alt='site logo'
                ></img>
                <h2
                  className={
                    util.hiddenOnMobile +
                    " " +
                    util.pointer +
                    " " +
                    styles.homeLogoText
                  }
                >
                  A Durrant.
                </h2>
              </div>
            </>
          </Link>

          <nav className={styles.nav}>
            <NavLink svg='recents' href='/' label='Home' shortcut='1' />
            <NavLink svg='about' href='/about' label='About' shortcut='2' />

            <NavLink
              svg='projects'
              href='/projects'
              label='Projects'
              shortcut='3'
            />
            <NavLink
              svg='star'
              href='/testimonials'
              label='Kind Words'
              shortcut='4'
            />
            <p className={styles.divider}>Resources</p>
            <NavLink svg='users' href='/blog' label='Blog' shortcut='5' />
            <NavLink
              svg='reading'
              href='/reading-list'
              label='Reading List'
              shortcut='6'
            />
            <NavLink
              svg='newsletters'
              href='/tools'
              label='Tools'
              shortcut='7'
            />
            <NavLink
              svg='podcasts'
              href='/podcasts'
              label='Podcasts'
              shortcut='8'
            />
            <p className={styles.divider}>Reach out</p>
            <Contact svg='chat' label='Contact' shortcut='9' />
            <NavLink
              svg='twitter'
              href='https://twitter.com/AdamDDurrant'
              label='Twitter'
              shortcut='0'
            />
          </nav>
        </div>
        <ThemeChanger />
      </div>
    </>
  );
}
