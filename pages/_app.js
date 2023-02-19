import "../styles/globals.css";
import Menu from "../components/menu";
import { ThemeProvider } from "next-themes";
import Background from "../components/background";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

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
            content='https://adamdurrant.co.uk/og/og.png'
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
        <Background />
        <Menu />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}

export default MyApp;
