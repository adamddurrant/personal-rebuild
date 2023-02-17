import "../styles/globals.css";
import Menu from "../components/menu";
import { ThemeProvider } from "next-themes";
import Background from "../components/background";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' value={{ dark: "dark-theme" }}>
      <>
        <Head>
          <link
            href='/favicon-small.png'
            rel='shortcut icon'
            type='image/x-icon'
          />
          <link href='/favicon-large.png' rel='apple-touch-icon' />
          <meta
            property='og:image'
            content='https://www.sj.land/og/index.png'
          />
        </Head>
        <Background />
        <Menu />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}

export default MyApp;
