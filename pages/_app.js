import "../styles/globals.css";
import Menu from "../components/menu";
import { ThemeProvider } from "next-themes";
import Background from "../components/background";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const canonicalUrl = (`https://adamdurrant.co.uk` + (router.asPath === "/" ? "" : router.asPath)).split("?")[0];

  return (
    <ThemeProvider attribute='class' value={{ dark: "dark-theme" }}>
      <>
        <Head>
          <link rel="canonical" href={canonicalUrl} />
          <link
            href='/favicon-small.png'
            rel='shortcut icon'
            type='image/x-icon'
          />
          <link href='/favicon-large.png' rel='apple-touch-icon' />
          <meta
            property='og:image'
            content='https://adamdurrant.co.uk/og/og.jpg'
          />
          <meta property='og:type' content='website' />
          <meta
            name='twitter:image'
            content='https://adamdurrant.co.uk/og/og.jpg'
          />
        </Head>
        <Toaster
          toastOptions={{
            duration: 1500,
            style: {
              padding: "3px",
              borderRadius: "6px",
              fontSize: "14px",
            },
          }}
        />
        <div className="base"></div>
        <Background />
        <Menu />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}

export default MyApp;
